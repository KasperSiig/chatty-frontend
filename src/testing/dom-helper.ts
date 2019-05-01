import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from "@angular/core";

export class DOMHelper<T> {
  private fixture: ComponentFixture<T>;

  constructor(fixture: ComponentFixture<T>) {
    this.fixture = fixture;
  }

  /**
   * Gets the text defined by the parameter
   * @param tagName
   */
  getElement(tagName: string): HTMLElement {
    const element = this.fixture.debugElement.query(By.css(tagName));
    if (element) {
      return element.nativeElement;
    }
  }

  /**
   * Counts the elements present on the screen
   * @param tagName
   */
  count(tagName: string): number {
    const elements = this.fixture.debugElement
      .queryAll(By.css(tagName));
    return elements.length;
  }

  /**
   * Checks to see how many elements exists with the given parameters
   * @param tagName
   * @param text
   */
  countText(tagName: string, text: string): number {
    const elements = this.fixture.debugElement
      .queryAll(By.css(tagName));
    return elements.filter(element => element.nativeElement.textContent === text).length;
  }

  /**
   * Clicks on the button with the given parameter
   * @param buttonText
   */
  clickButton(buttonText: string) {
    this.findAll('button').forEach(button => {
      const buttonEle: HTMLButtonElement = button.nativeElement;
      if (buttonEle.textContent === buttonText) {
        buttonEle.click();
      }
    });
  }

  /**
   * Finds all elements with the parameter
   * @param tagName
   */
  findAll(tagName: string) {
    return  this.fixture.debugElement.queryAll(By.css(tagName));
  }
}
