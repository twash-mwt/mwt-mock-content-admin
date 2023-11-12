"use client";
import { Builder, withChildren } from "@builder.io/react";
import { Button, ButtonSize, ButtonKind, ImageCarousel } from 'mwt-components-react';

Builder.registerComponent(withChildren(Button), {
  name: "Button",
  inputs: [{
    name: 'size',
    type: 'text',
    enum: [{
      label: ButtonSize.SMALL,
      value: ButtonSize.SMALL,
    }, {
      label: ButtonSize.MEDIUM,
      value: ButtonSize.MEDIUM,
    }, {
      label: ButtonSize.LARGE,
      value: ButtonSize.LARGE,
    }]
  }, {
    name: 'kind',
    type: 'text',
    enum: [{
      label: ButtonKind.PRIMARY,
      value: ButtonKind.PRIMARY,
    }, {
      label: ButtonKind.SECONDARY,
      value: ButtonKind.SECONDARY,
    }, {
      label: ButtonKind.TERTIARY,
      value: ButtonKind.TERTIARY,
    }]
  }],
  defaultChildren: [
    { 
      '@type': '@builder.io/sdk:Element',
      component: { name: 'Text', options: { text: 'Change Me!' } }
    }
  ]
});

Builder.registerComponent(ImageCarousel, {
  name: "Image Carousel",
  inputs: [
    {
      name: "carouselItems",
      type: "list",
      defaultValue: [],
      subFields: [
        {
          name: "imgSrc",
          type: "file",
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
        },
        {
          name:"link",
          type: "string"
        },
        {
          name:"target",
          type: "string",
          enum: ["_blank", "_self"],
          friendlyName: "_blank = New Tab, _self = Same Window"
        },
        {
          name:"width",
          type: "number",
          defaultValue: 200,
        },
        {
          name:"height",
          type: "number",
          defaultValue: 300,
        },

      ]
    },
    {
      name: "itemsPerPage",
      type: "number",
    }
  ]
})
