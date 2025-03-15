

export interface Load {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $databaseId: string;
  $collectionId: string;
  $permissions: string[];
  description: string;
  origin: string;
  destination: string;
  status: string;
  latitude: number;
  longitude: number;
  driverId: string;
}