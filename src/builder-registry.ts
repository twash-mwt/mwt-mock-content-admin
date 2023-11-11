"use client";
import { Builder, withChildren } from "@builder.io/react";
import { Button, ButtonProps, ButtonSize, ButtonKind } from 'mwt-components-react';

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
