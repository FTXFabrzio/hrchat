import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Department } from '../../core/models/department.model';
import { Employee, EmployeeStatus } from '../../core/models/employee.model';
import { DepartmentsApiService } from '../../core/services/departments-api.service';
import { EmployeesApiService } from '../../core/services/employees-api.service';
import { SupabaseAuthService } from '../../core/services/supabase-auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false,
})
export class DashboardComponent implements OnInit {
  departments: Department[] = [];
  employees: Employee[] = [];

  departmentSearch = '';
  employeeSearch = '';

  isDepartmentModalOpen = false;
  isEmployeeModalOpen = false;

  editingDepartment: Department | null = null;
  editingEmployee: Employee | null = null;

  isLoadingDepartments = false;
  isLoadingEmployees = false;

  readonly estadoOptions: EmployeeStatus[] = [
    'ACTIVO',
    'CESADO',
    'SUSPENDIDO',
  ];
  readonly ubicacionOptions = ['Sede Norte', 'Sede Sur', 'Sede Principal'];

  departmentForm: FormGroup;
  employeeForm: FormGroup;

  constructor(
    private readonly departmentsService: DepartmentsApiService,
    private readonly employeesService: EmployeesApiService,
    private readonly authService: SupabaseAuthService,
    private readonly formBuilder: FormBuilder,
    private readonly cdr: ChangeDetectorRef,
    private readonly ngZone: NgZone,
    private readonly router: Router,
  ) {
    this.departmentForm = this.formBuilder.group({
      nombre: [
        '',
        [Validators.required, Validators.pattern(/^[\p{L}\s]+$/u)],
      ],
      ubicacion: [''],
      presupuesto: this.formBuilder.control<number | null>(null, [
        Validators.min(0),
      ]),
    });

    this.employeeForm = this.formBuilder.group(
      {
        nombre: [
          '',
          [Validators.required, Validators.pattern(/^[\p{L}\s]+$/u)],
        ],
        email: ['', [Validators.required, Validators.email]],
        id_departamento: ['', Validators.required],
        estado: ['ACTIVO', Validators.required],
        fecha_inicio: [''],
        fecha_fin: [''],
      },
      { validators: this.dateRangeValidator },
    );
  }

  ngOnInit() {
    this.loadDepartments();
    this.loadEmployees();
  }

  loadDepartments() {
    this.isLoadingDepartments = true;
    this.departmentsService.list(this.departmentSearch).subscribe({
      next: (data) => {
        this.ngZone.run(() => {
          this.departments = data;
          this.isLoadingDepartments = false;
          this.cdr.detectChanges();
        });
      },
      error: () => {
        this.ngZone.run(() => {
          this.isLoadingDepartments = false;
          this.cdr.detectChanges();
        });
      },
    });
  }

  loadEmployees() {
    this.isLoadingEmployees = true;
    this.employeesService
      .list({ search: this.employeeSearch })
      .subscribe({
        next: (data) => {
          this.ngZone.run(() => {
            this.employees = data;
            this.isLoadingEmployees = false;
            this.cdr.detectChanges();
          });
        },
        error: () => {
          this.ngZone.run(() => {
            this.isLoadingEmployees = false;
            this.cdr.detectChanges();
          });
        },
      });
  }

  openDepartmentModal(department?: Department) {
    this.editingDepartment = department ?? null;
    this.departmentForm.reset({
      nombre: department?.nombre ?? '',
      ubicacion: department?.ubicacion ?? '',
      presupuesto: department?.presupuesto ?? null,
    });
    this.isDepartmentModalOpen = true;
  }

  closeDepartmentModal() {
    this.isDepartmentModalOpen = false;
    this.editingDepartment = null;
  }

  saveDepartment() {
    if (this.departmentForm.invalid) {
      this.departmentForm.markAllAsTouched();
      return;
    }

    const raw = this.departmentForm.value;
    const payload = {
      nombre: raw.nombre ?? undefined,
      ubicacion: raw.ubicacion ?? null,
      presupuesto:
        raw.presupuesto === null || raw.presupuesto === undefined || raw.presupuesto === ''
          ? null
          : Number(raw.presupuesto),
    };
    const request$ = this.editingDepartment
      ? this.departmentsService.update(this.editingDepartment.id, payload)
      : this.departmentsService.create(payload);

    request$.subscribe({
      next: () => {
        this.closeDepartmentModal();
        this.loadDepartments();
      },
    });
  }

  deleteDepartment(department: Department) {
    if (!confirm(`Eliminar ${department.nombre}?`)) {
      return;
    }

    this.departmentsService.remove(department.id).subscribe({
      next: () => this.loadDepartments(),
    });
  }

  openEmployeeModal(employee?: Employee) {
    this.editingEmployee = employee ?? null;
    this.employeeForm.reset({
      nombre: employee?.nombre ?? '',
      email: employee?.email ?? '',
      id_departamento: employee?.id_departamento ?? '',
      estado: employee?.estado ?? 'ACTIVO',
      fecha_inicio: employee?.fecha_inicio ?? '',
      fecha_fin: employee?.fecha_fin ?? '',
    });
    this.isEmployeeModalOpen = true;
  }

  closeEmployeeModal() {
    this.isEmployeeModalOpen = false;
    this.editingEmployee = null;
  }

  saveEmployee() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const raw = this.employeeForm.value;
    const payload = {
      nombre: raw.nombre ?? undefined,
      email: raw.email ?? undefined,
      id_departamento: raw.id_departamento ?? undefined,
      estado: raw.estado ?? undefined,
      fecha_inicio: raw.fecha_inicio || undefined,
      fecha_fin: raw.fecha_fin || undefined,
    };
    const request$ = this.editingEmployee
      ? this.employeesService.update(this.editingEmployee.id, payload)
      : this.employeesService.create(payload);

    request$.subscribe({
      next: () => {
        this.closeEmployeeModal();
        this.loadEmployees();
      },
    });
  }

  deleteEmployee(employee: Employee) {
    if (!confirm(`Eliminar ${employee.nombre}?`)) {
      return;
    }

    this.employeesService.remove(employee.id).subscribe({
      next: () => this.loadEmployees(),
    });
  }

  async logout() {
    await this.authService.signOut();
    await this.router.navigate(['/login']);
  }

  private dateRangeValidator(group: AbstractControl) {
    const start = group.get('fecha_inicio')?.value as string | undefined;
    const end = group.get('fecha_fin')?.value as string | undefined;

    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      if (endDate < startDate) {
        return { dateRange: true };
      }
    }

    return null;
  }
}
