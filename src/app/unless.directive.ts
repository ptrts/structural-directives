import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

/**
 * Add the template content to the DOM unless the condition is true.
 *
 * If the expression assigned to `myUnless` evaluates to a truthy value
 * then the templated elements are removed removed from the DOM,
 * the templated elements are (re)inserted into the DOM.
 *
 * <div *ngUnless="errorCount" class="success">
 *   Congrats! Everything is great!
 * </div>
 *
 * ### Syntax
 *
 * - `<div *myUnless="condition">...</div>`
 * - `<div template="myUnless condition">...</div>`
 * - `<template [myUnless]="condition"><div>...</div></template>`
 *
 */
@Directive({selector: '[myUnless]'})
export class UnlessDirective {

    // Наша собственная переменная, которая показывает, выведен ли сейчас шаблон в представление,
    // или в представлении у нас сейчас ничего нет
    private hasView = false;

    constructor(private templateRef: TemplateRef<any>,
                private viewContainer: ViewContainerRef) {
    }

    // Наверное, то что здесь стоит директива @Input - это означает, что каждый раз, когда соответствующее значение
    // будет обновляться, то каждый раз будет вызываться этот метод.
    // Метод будет вызываться даже тогда, когда новое значение выражения - такое же как и предыдущее.
    @Input()
    set myUnless(condition: boolean) {

        if (!condition && !this.hasView) {

            // false и !this.hasView

            // В переданном нам контейнере представления, создаем представление,
            // используя для этого просто наш весь шаблон
            this.viewContainer.createEmbeddedView(this.templateRef);

            // Записываем себе флажок, что да, в контейнер представления выведен наш шаблон
            this.hasView = true;

        } else if (condition && this.hasView) {

            // true && this.hasView

            // Удаляем из контейнера представления все что там есть
            this.viewContainer.clear();

            // Пишем себе флажок, что в контейнере представления у нас ничего нету
            this.hasView = false;
        }
    }
}
