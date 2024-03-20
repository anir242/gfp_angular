import { Component, OnInit, Input } from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';
import {CountersPublicInterface} from '../../../../_models/api/public/counters-public-interface';
import {CountersPublicService} from '../../../../_services/public/counters.public.service';
import { ProjectsService } from '../../../../_services/projects/projects.service';
import {CompanyService} from '../../../../_services/companies/company.service';
import {Response} from '../../../../_models/api/response';
import { ProjectTypes } from 'src/app/_models/components/project-types';
import { CompanyInterface } from '../../../../_models/api/companies/company-interface';

interface ProjectInterface {
  name: string;
  type: {
    name: string;
  };
  image: {
    url: string;
  };
  country: {
    name?: string;
  };
  slug: string;
  status: string;
  createdAt: Date;
}

@Component({
  selector: 'app-achievements-data',
  templateUrl: './achievements-data.component.html',
  styleUrls: ['./achievements-data.component.scss']
})

export class AchievementsDataComponent extends BaseComponent implements OnInit {
  countersPublicInterface: CountersPublicInterface;
  @Input() forApi: boolean;
  @Input() company: CompanyInterface;
  @Input() projectType: string;
  @Input() projectTypeName: string = '';
  windowWidth = window.innerWidth;
  arrows = window.innerWidth < 992;
  @Input() showCTA: boolean = true;

  preservationUnit: string = 'ha';
  renewableUnit: string = 'kWh';
  co2Unit: string = 'kg';
  showStats: boolean = true;
  projects: ProjectInterface[] = [];
  isLargeScreen: boolean;

  constructor(
    private countersPublicService: CountersPublicService,
    private companyService: CompanyService,
    private projectsService: ProjectsService
  ) {
    super();
  }

  ngOnInit(): void {
    //this.isLargeScreen = this.breakpointObserver.isMatched('(max-width: 1399px)');
    this.projectsService.getPublicProjects().then((res: {data: ProjectInterface[]}) => {
      this.projects = res.data.filter(project => project.status === 'active')
      .sort((a, b) => (new Date(b.createdAt)).getUTCMilliseconds() - (new Date(a.createdAt)).getUTCMilliseconds())
      .slice(0, 3)
    });
    this.getCounters().then();
    if (this.projectType && !this.projectTypeName) {
      this.projectTypeName = this.projectType.replace('_', ' ') + ' ';
    }
  }

  humanize(x: number): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  toggleStatsView() {
    this.showStats = !this.showStats;
    if(this.showStats) {
      this.getCounters().then();
      if (this.projectType && !this.projectTypeName) {
        this.projectTypeName = this.projectType.replace('_', ' ') + ' ';
      }
    }
  }

  onResize = () => {
    this.windowWidth = window.innerWidth;
    this.arrows = window.innerWidth < 992;
  }

  getCounters = async () => {
    try {
      let params = {};
      if (this.projectType) {
        //params['projectType'] = this.projectType;
      }
      let response: Response<CountersPublicInterface>;
      if (this.company) {
        response = await this.companyService.getCompanyCounters(this.company.id);
      } else {
        response = await this.countersPublicService.getPublicCounters(params);
      }
      if (response?.success) {
        this.countersPublicInterface = response.data;
        var impacts = document.querySelectorAll('.impact');
        var loaders = document.querySelectorAll('.lds-ellipsis');
        for (var i = 0; i < loaders?.length; i++) {
          var loader = loaders[i];
          loader.classList.add('hidden')
        }
        for (var i = 0; i < impacts?.length; i++) {
          var impact = impacts[i];
          impact.classList.remove('hidden')
        }
        const trees = response.data.restoration.unit;
        const restorationCO2 = Number(response.data.restoration.certified) + Number(response.data.restoration.notCertified)
        const preservationCO2 = Number(response.data.preservation.certified) + Number(response.data.preservation.notCertified)
        const renewableCO2 = Number(response.data.renewable_energy.certified) + Number(response.data.renewable_energy.notCertified)
        const hectares = response.data.preservation.unit;
        const acres = hectares * 0.404686;
        const metres = Math.round(acres * 10000 * 100) / 100;
        const kwh = response.data.renewable_energy.unit;
        const corals = Math.ceil(response.data.marine_restoration.unit);
        let co2 = 0;

        let scienceBackedCO2 = Number(response.data.restoration.notCertified) + Number(response.data.preservation.notCertified) + Number(response.data.renewable_energy.notCertified);
        let certified = Number(response.data.restoration.certified) + Number(response.data.preservation.certified) + Number(response.data.renewable_energy.certified);

        switch (this.projectType) {
          case ProjectTypes.restoration:
            co2 += restorationCO2;
            break;
          case ProjectTypes.preservation:
            co2 += preservationCO2;
            break;
          case ProjectTypes.renewable_energy:
            co2 += renewableCO2;
            break;
          case ProjectTypes.marine_restoration:
            break;
          default:
            co2 += restorationCO2 + preservationCO2 + renewableCO2;
            if (response.data.tonnes) {
              co2 += response.data.tonnes.unit;
            }
            break;
        }

        
        const roundedTrees = trees | 0;
        response.data.restoration.unit = roundedTrees;
        response.data.restoration.unitStr = this.humanize(roundedTrees);
        const roundedAcres = acres | 0;
        //response.data.preservation.unit = roundedAcres;
        //response.data.preservation.unitStr = this.humanize(roundedAcres);
        let roundedHectares = 0;
        if (hectares >= 1) {
          roundedHectares = ((hectares * 100) | 0) / 100;
        } else {
          roundedHectares = ((hectares * 1000 * 100) | 0) / 100;
          this.preservationUnit = 'm<sup>2</sup>';
        }
        response.data.preservation.unit = roundedHectares;
        response.data.preservation.unitStr = this.humanize(roundedHectares);
        let roundedKWh = kwh;
        if (kwh >= 1000) {
          roundedKWh = kwh / 1000 | 0;
          this.renewableUnit = 'MWh';
        }
        response.data.renewable_energy.unit = roundedKWh;
        response.data.renewable_energy.unitStr = this.humanize(roundedKWh);
        response.data.marine_restoration.unitStr = this.humanize(corals);
        this.countersPublicInterface = response.data;
        let roundedCo2 = Math.ceil(co2);
        let roundedCertified = Math.ceil(certified);
        let roundedScienceBacked = Math.ceil(scienceBackedCO2);
        let certifiedUnit = 'kg';
        let scienceBackedUnit = 'kg';
        if (certified > 1000) {
          roundedCertified = (roundedCertified / 1000) | 0;
          certifiedUnit = 't';
        }

        if (scienceBackedCO2 > 1000) {
          roundedScienceBacked = (roundedScienceBacked / 1000) | 0;
          scienceBackedUnit = 't';
        }

        if (co2 > 1000) {
          roundedCo2 = (co2 / 1000) | 0;
          this.co2Unit = 't';
        }
        this.countersPublicInterface.co2 = roundedCo2;
        this.countersPublicInterface.co2Str = this.humanize(roundedCo2);
        this.countersPublicInterface.certifiedStr = this.humanize(roundedCertified);
        this.countersPublicInterface.scienceBackedStr = this.humanize(roundedScienceBacked);

        // Hard fix as temporary error resolution
        //response.data.restoration.unit = 274354;
        //response.data.restoration.unitStr = '274,354';
        //response.data.preservation.unit = 205;
        //response.data.preservation.unitStr = '205';
        //response.data.renewable_energy.unit = 1850;
        //response.data.renewable_energy.unitStr = '1,850';
        //this.countersPublicInterface = response.data;
        //this.countersPublicInterface.co2 = 6604;
        //this.countersPublicInterface.co2Str = '6,604';

      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  onLearnMore() {
    this.router.navigate([`/company/${this.company.slug}`]);
  }

  onLiveExperience(project: ProjectInterface) {
    this.router.navigate(['projects', project.slug, 'live']);
  }

  getProjectTypeColor(project: ProjectInterface) {
    const COLOR_MAP = {
      'preservation': '#B5E7EA',
      'restoration': '#C3E8C1',
      'renewable energy': '#F4B68C',
      'marine restoration': '#9FBEDA'
    }

    const key = project.type.name.toLowerCase();
    const color = COLOR_MAP[key] || 'white';

    return color;
  }

  getFixedCounters(response): void {

  }

}
