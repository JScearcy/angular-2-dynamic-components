import { NgModule, Directive, ViewContainerRef, Input, Component, ComponentFactory, Compiler } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DynamicComponent {}

export interface ComponentOptions {
  selector: string;
  template: string;
  bindings: any;
  functions: any;
}

@Directive({
  selector: '[dynamicComponent]'
})
export class DynamicComponentDirective {
  @Input('dynamicComponent')
    // When the dynamicComponent is set
    set dynamicComponent(values: ComponentOptions) {
      if (values) {
        // clear any old data in the container ref
        this.viewContainerRef.clear();
        // create the component using the values provided
        let component = this.createDynamicComponent(values);
        // create the module using the newly created component
        let module = this.createDynamicComponentModule(component);
        // compile and create the component inside the ViewContainerRef
        this.compiler
            .compileModuleAndAllComponentsAsync(module)
            .then((moduleWithFactories) => moduleWithFactories.componentFactories.find(f => f.componentType == component))
            .then((factory) => this.viewContainerRef.createComponent(factory));
      }
    }
  constructor(
        private viewContainerRef: ViewContainerRef,
        private compiler: Compiler) { }

  createDynamicComponent(values: ComponentOptions): Component {
    // setting the selector and template of the dynamic component to create
    @Component({
      selector: values.selector || 'dynamic-component',
      template: values.template,
    })
    // create a class that the compiler can use to create a component
    class DynamicComponent implements DynamicComponent {
      constructor() {
        // iterate through the functions and create functions from those provided
        // running unknown code isn't really the safest thing to do, just an example.
        for (let key in values.functions) {
          this[key] = new Function(values.functions[key]);
          if (Object && Object.defineProperty) {
            Object.defineProperty(this[key], 'name', {value: key});
          }
        }
        // iterate through the bindings provided and create each
        for (let key in values.bindings) {
          this[key] = values.bindings[key];
        }
      }
    }

    return DynamicComponent;
  }

  createDynamicComponentModule (componentType: any) {
    @NgModule({
      imports: [
        CommonModule,
      ],
      declarations: [
        componentType,
      ],
    })
    class DynamicComponentModule { }
    return DynamicComponentModule;
  }

}
