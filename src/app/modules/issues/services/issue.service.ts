import { Injectable, signal } from '@angular/core';
import {
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { getIssueByNumber, getIssueCommentsByNumber } from '../actions';
import { GitHubIssue } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private _issueNumber = signal<string | null>(null);
  private _queryClient = injectQueryClient();

  issueQuery = injectQuery(() => ({
    queryKey: ['issue', this._issueNumber()],
    queryFn: () => getIssueByNumber(this._issueNumber()!),
    enabled: !!this._issueNumber(),
    staleTime: 1000 * 60 * 5, // 5 MINUTES
  }));

  issueCommentsQuery = injectQuery(() => ({
    queryKey: ['issue', this._issueNumber(), 'comments'],
    queryFn: () => getIssueCommentsByNumber(this._issueNumber()!),
    enabled: !!this._issueNumber(),
  }));

  setIssueNumber(issueNumber: string) {
    this._issueNumber.set(issueNumber);
  }

  prefetchIssue(issueNumber: string) {
    this._queryClient.prefetchQuery({
      queryKey: ['issue', issueNumber],
      queryFn: () => getIssueByNumber(issueNumber),
      staleTime: 1000 * 60 * 5, // 5 MINUTES
    });
  }

  setIssueData(issue: GitHubIssue) {
    this._queryClient.setQueryData(['issue', issue.number.toString()], issue, {
      updatedAt: Date.now() + 1000 * 60, // 1 MINUTE
    });
  }
}
