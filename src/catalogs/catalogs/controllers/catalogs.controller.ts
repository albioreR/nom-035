import { apiMethods, GuardSwagger, Swagger } from '@/config';

import { CatalogsService } from '../services';

@GuardSwagger({
  tag: 'catalog',
})
export class CatalogsController {
  constructor(private readonly catalogsService: CatalogsService) {}

  @Swagger({
    link: 'static-catalogs',
    restApi: apiMethods.get,
  })
  staticCatalog() {
    return this.catalogsService.staticCatalog();
  }
}
