import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';




describe('AppComponent', () => {

  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  function pressButton() {
    const button = fixture.nativeElement.querySelector("#get-compliment-button");
    button.click();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      app  = fixture.componentInstance;
    });
  });

  it('should create the app', () => {

    expect(app).toBeTruthy();
  });

  it('should not show compliment on init', () => {

    expect(app.loading).toBeFalse();
    expect(app.currentCompliment).toBeNull();
  })

  it('should change compliment on click', fakeAsync(() => {
    
    expect(app.loading).toBeFalse();
    expect(app.currentCompliment).toBeNull();
    pressButton();
    
    expect(app.loading).toBeTrue();
    tick(app.animationLength);
    expect(app.loading).toBeFalse();
    expect(app.currentCompliment).not.toBeNull();
  }))

  it('should never show the same compliment right after another', fakeAsync(() => {
    
    expect(app.loading).toBeFalse();
    expect(app.currentCompliment).toBeNull();

    pressButton();
    expect(app.loading).toBeTrue();
    tick(app.animationLength);
    expect(app.loading).toBeFalse();
    expect(app.currentCompliment).not.toBeNull();

    for(var i = 0; i <= 100;i++) {
      const lastCompliment = app.currentCompliment.id;
      pressButton();
      tick(app.animationLength);
      expect(lastCompliment.id).not.toEqual(app.currentCompliment.id)
    }
  }))

  
});
