import { pick } from 'lodash';

export interface IEntityMapper {
  getListOfProps(): string[];
  mapFrom<Type>(partial?: Partial<Type>): void;
}

export class EntityMapper implements IEntityMapper {
  constructor(partial?: Partial<any>) {
    this.mapFrom(partial);
  }

  getListOfProps(): string[] {
    return [];
  }

  mapFrom<Type>(partial?: Partial<Type>): void {
    if (partial) Object.assign(this, pick(partial, this.getListOfProps()));
  }
}
