export interface Meta {
  page_number: string | number;
  page_size: number | string;
  sort_by: number | string;
  sort_direction: number | string;
  total_of_pages: number | string;
  total_of_registers: number | string;
  term: string | null | undefined;
}
