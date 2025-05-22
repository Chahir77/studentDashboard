import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StudentService } from './student.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockStudentService: any;

  beforeEach(async () => {
    mockStudentService = {
      getStudents: jasmine
        .createSpy('getStudents')
        .and.returnValue(of([{ rollNumber: '1', name: 'John' }])),
      registerStudent: jasmine
        .createSpy('registerStudent')
        .and.returnValue(of({ message: 'Registered' })),
      deleteStudent: jasmine
        .createSpy('deleteStudent')
        .and.returnValue(of({ message: 'Deleted' })),
      updateStudent: jasmine
        .createSpy('updateStudent')
        .and.returnValue(of({ message: 'Updated' })),
    };

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule],
      providers: [{ provide: StudentService, useValue: mockStudentService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit (constructor)
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch student details on init', () => {
    expect(mockStudentService.getStudents).toHaveBeenCalled();
    expect(component.studentDetails.length).toBeGreaterThan(0);
  });

  it('should call registerStudent on register()', () => {
    const mockForm = {
      value: {
        rollNumber: '1',
        name: 'Test',
        address: 'Address',
        percentage: '90',
      },
      reset: jasmine.createSpy('reset'),
    } as any;

    component.register(mockForm);
    expect(mockStudentService.registerStudent).toHaveBeenCalledWith(
      mockForm.value
    );
    expect(mockForm.reset).toHaveBeenCalled();
  });

  it('should call deleteStudent on deleteStudent()', () => {
    const student = { rollNumber: '1' };
    component.deleteStudent(student);
    expect(mockStudentService.deleteStudent).toHaveBeenCalledWith('1');
  });

  it('should call updateStudent on updateStudent()', () => {
    component.studentToUpdate = {
      rollNumber: '1',
      name: 'Updated',
      address: '',
      percentage: '',
    };
    component.updateStudent();
    expect(mockStudentService.updateStudent).toHaveBeenCalledWith(
      component.studentToUpdate
    );
  });
});
