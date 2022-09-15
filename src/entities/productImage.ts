import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('products_image')
class ProductImage {
  @PrimaryColumn()
  id: string;
  @Column()
  product_id: string;
  @Column()
  image_name: string;
  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { ProductImage };
