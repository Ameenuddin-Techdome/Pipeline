import type { Schema, Struct } from '@strapi/strapi';

export interface CategoryDisclosure extends Struct.ComponentSchema {
  collectionName: 'components_category_disclosures';
  info: {
    displayName: 'Disclosure';
  };
  attributes: {
    fda_disclaimer: Schema.Attribute.Blocks;
    regulatory_info: Schema.Attribute.Blocks;
    resources_link: Schema.Attribute.String;
    usage_info: Schema.Attribute.Blocks;
  };
}

export interface CategoryOverview extends Struct.ComponentSchema {
  collectionName: 'components_category_overviews';
  info: {
    displayName: 'Overview';
  };
  attributes: {
    card1_description: Schema.Attribute.Blocks;
    card1_title: Schema.Attribute.String;
    card2_description: Schema.Attribute.Blocks;
    card2_title: Schema.Attribute.String;
    card3_description: Schema.Attribute.Blocks;
    card3_title: Schema.Attribute.String;
  };
}

export interface CategoryTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_category_testimonials';
  info: {
    displayName: 'Testimonial';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
    quote: Schema.Attribute.Blocks;
    result: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'category.disclosure': CategoryDisclosure;
      'category.overview': CategoryOverview;
      'category.testimonial': CategoryTestimonial;
    }
  }
}
