import { NgModule, Directive, ViewContainerRef, Input, Component, ComponentFactory, Compiler } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DynamicComponent {}

export interface ComponentOptions {
  template: string;
  bindings: any;
  functions: any;
}

@Directive({
  selector: '[appDynamicTemplate]'
})
export class DynamicTemplateDirective {
  @Input('appDynamicTemplate') 
    set appDynamicTemplate(values: ComponentOptions) {
      if (values) {
        this.viewContainerRef.clear();
        let component = this.createDynamicComponent(values);
        let module = this.createDynamicComponentModule(component);
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
    @Component({
      selector: 'dynamic-component',
      template: values.template,
    })
    class DynamicComponent implements DynamicComponent {
      // running unknown code isn't really the safest thing to do, just an example.
      constructor() {
        for (let key in values.functions) {
          this[key] = new Function(values.functions[key]);
        }

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
