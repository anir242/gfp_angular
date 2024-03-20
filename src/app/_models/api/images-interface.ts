export interface ImagesInterface {
  id: string;
  filename: string;
  url: string;
  type: string;
  uploadedBy: string;
  status: string;
}

export interface VideoInterface extends ImagesInterface {}
