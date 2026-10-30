export type TicketUrlState = {
  search: string;
  status: string;
  priority: string;
  assignee: string;
  sort: string;
  direction: "asc" | "desc";
  page: number;
  pageSize: number;
};

const defaultState: TicketUrlState = {
  search: "",
  status: "",
  priority: "",
  assignee: "",
  sort: "createdAt",
  direction: "desc",
  page: 0,
  pageSize: 8,
};

export function parseTicketUrlState(search: string): TicketUrlState {
  const params = new URLSearchParams(search);
  const page = Number(params.get("page"));
  const pageSize = Number(params.get("pageSize"));
  const direction = params.get("direction");
  const requestedSort = params.get("sort");
  return {
    search: params.get("q") ?? defaultState.search,
    status: params.get("status") ?? defaultState.status,
    priority: params.get("priority") ?? defaultState.priority,
    assignee: params.get("assignee") ?? defaultState.assignee,
    sort: requestedSort && ["createdAt", "status", "priority", "assigneeId", "id"].includes(requestedSort)
      ? requestedSort
      : defaultState.sort,
    direction: direction === "asc" ? "asc" : "desc",
    page: Number.isInteger(page) && page >= 0 ? page : defaultState.page,
    pageSize: [5, 8, 15, 25].includes(pageSize) ? pageSize : defaultState.pageSize,
  };
}

export function serializeTicketUrlState(state: TicketUrlState, currentSearch = ""): string {
  const params = new URLSearchParams(currentSearch);
  const setOrDelete = (key: string, value: string) => value ? params.set(key, value) : params.delete(key);
  setOrDelete("q", state.search);
  setOrDelete("status", state.status);
  setOrDelete("priority", state.priority);
  setOrDelete("assignee", state.assignee);
  setOrDelete("sort", state.sort === defaultState.sort ? "" : state.sort);
  setOrDelete("direction", state.direction === defaultState.direction ? "" : state.direction);
  setOrDelete("page", state.page === 0 ? "" : String(state.page));
  setOrDelete("pageSize", state.pageSize === defaultState.pageSize ? "" : String(state.pageSize));
  return params.toString();
}
