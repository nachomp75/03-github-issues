import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { GitHubLabel } from '../../interfaces';
import { IssuesService } from '../../services/issues.service';

@Component({
  selector: 'issues-labels-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labels-selector.component.html',
})
export class LabelsSelectorComponent {
  labels = input.required<GitHubLabel[]>();
  issuesService = inject(IssuesService);

  isSelected(label: string) {
    return this.issuesService.selectedLabels().has(label);
  }

  onToggleLabel(label: string) {
    this.issuesService.toggleLabel(label);
  }
}
