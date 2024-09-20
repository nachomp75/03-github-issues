import { sleep } from '@helpers/sleep';
import { environment } from 'src/environments/environment.development';
import { GitHubIssue, State } from '../interfaces';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getIssues = async (
  state = State.All,
  selectedLabels: string[]
): Promise<GitHubIssue[]> => {
  await sleep(500);

  const params = new URLSearchParams();
  params.append('state', state);

  if (selectedLabels.length > 0) {
    params.append('labels', selectedLabels.join(','));
  }

  try {
    const res = await fetch(`${BASE_URL}/issues?${params}`, {
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
