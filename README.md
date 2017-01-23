# HtmlStrings

This project is working with creation of dynamic components. 

Within the src/app/directives folder there is a directive, when added to a div that will take an object in this form:

```
{
    template: string,
    bindings: {
        key: value: string
    },
    functions: {
        key: value: string
    }
}
```
The directive will create a component and attach it to the view reference given.

Example JSON with string template: 
```
    {
        "template": "<p *ngIf='!isClicked' (click)='clickHandle(\"Going to hide\")'>Show</p><p *ngIf='isClicked' (click)='clickHandle(\"Going to show\")'>Hide</p>",
        "bindings": {
            "isClicked": false
        },
        "functions": {
            "clickHandle": "this.isClicked = !this.isClicked;  console.log(arguments);"
        }
    }   
```
Which is  `JSON.parse()`-d in the app.component.ts located in the src/app folder and given to the directive

Example JSON with an array template:
```
{
    "template": [
        "<p *ngIf='!isClicked' (click)='clickHandle(\"true\")'>Show</p>",
        "<p *ngIf='isClicked' (click)='clickHandleWithArgs(\"false\")'>Hide</p>",
        "<div *ngIf='isClicked'>Dynamically hidden text!</div>"
    ],
    "bindings": {
        "isClicked": false
    },
    "functions": {
        "clickHandle": "this.isClicked = !this.isClicked",
        "clickHandleWithArgs": "let [clickState] = arguments; this.isClicked = (clickState === 'true');"
    }
}
```
Which is  `JSON.parse()`-d in the app.component.ts located in the src/app folder, joined to become a string, and then given to the directive

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
