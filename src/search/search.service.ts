import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  update(index: string, id: number | string, data: object) {
    const params = {
      id: id.toString(),
      type: '_doc',
      retryOnConflict: 3,
      body: { doc: data, doc_as_upsert: true },
      index
    };

    return this.elasticsearchService.update(params);
  }
}
