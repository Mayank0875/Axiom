import { CatalogRepository } from "../repositories/catalog.repository";

export class CatalogService {
  constructor(private readonly catalogRepository: CatalogRepository) {}

  public listPrograms() {
    return this.catalogRepository.listPrograms();
  }

  public listBatches() {
    return this.catalogRepository.listBatches();
  }

  public listCertifications() {
    return this.catalogRepository.listCertifiedMembers();
  }

  public listJobs() {
    return this.catalogRepository.listJobOpenings();
  }

  public listExercises() {
    return this.catalogRepository.listProgrammingExercises();
  }

  public getStatistics() {
    return this.catalogRepository.getStatistics();
  }
}

