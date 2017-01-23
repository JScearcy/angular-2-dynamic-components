import { NgModule, Directive, ViewContainerRef, Input, Component, ComponentFactory, Compiler } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DynamicComponent {}

export interface ComponentOptions {
  template: string;
  bindings: any;
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
      public bindings = values.bindings;
      public isClicked = false;

      clickHandle() {
        this.isClicked = !this.isClicked;
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
