import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MonthlyClimateSubscriptionComponent } from './pages/monthly-climate-subscription/monthly-climate-subscription.component';

const routes: Routes = [
    {
        path: '',
        component: MonthlyClimateSubscriptionComponent,
        title: 'GFP | Monthly Climate Subscription'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MonthlyClimateSubscriptionRoutingModule { }