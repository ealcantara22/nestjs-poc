import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

/**
 * Mapped-types inserts all the extended rules with the exception that additionally makes
 * all the fields optional, this is great for PATCH requests
 * @see https://docs.nestjs.com/techniques/validation#mapped-types
 */
export class UpdateProductDto extends PartialType(CreateProductDto) {}
