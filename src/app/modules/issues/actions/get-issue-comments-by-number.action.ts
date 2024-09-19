import { sleep } from '@helpers/sleep';
import { environment } from 'src/environments/environment.development';
import { GitHubIssue } from '../interfaces';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getIssueCommentsByNumber = async (
  issueNumber: string
): Promise<GitHubIssue[]> => {
  await sleep(500);

  try {
    const res = await fetch(`${BASE_URL}/issues/${issueNumber}/comments`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!res.ok) throw "Can't load issues";

    const issues = await res.json();

    return issues;
  } catch (error) {
    throw "Can't load issues";
  }
};
