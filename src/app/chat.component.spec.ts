import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('Complaint chat', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AppComponent] }).compileComponents();
  });

  it('starts with a complaint and posts another random complaint', () => {
    spyOn(Math, 'random').and.returnValues(0, 0.99);
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.messages.length).toBe(1);
    expect(fixture.nativeElement.textContent).toContain('My order arrived late');

    fixture.nativeElement.querySelector('.sample-button').click();
    fixture.detectChanges();

    expect(fixture.componentInstance.messages.length).toBe(2);
    expect(fixture.nativeElement.textContent).toContain('I contacted support last week');
  });

  it('sends trimmed replies and ignores blank replies', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.reply = '   ';
    component.sendReply();
    expect(component.messages.length).toBe(1);

    component.reply = '  I can help with that.  ';
    component.sendReply();
    fixture.detectChanges();

    expect(component.messages.length).toBe(2);
    expect(component.messages[1].text).toBe('I can help with that.');
    expect(component.messages[1].sender).toBe('You');
    expect(component.reply).toBe('');
    expect(fixture.nativeElement.textContent).toContain('I can help with that.');
  });
});
