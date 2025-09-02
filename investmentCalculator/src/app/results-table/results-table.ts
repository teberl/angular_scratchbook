import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-results-table',
  imports: [CurrencyPipe],
  templateUrl: './results-table.html',
  styleUrl: './results-table.css',
})
export class ResultsTable {
  private investmentService = inject(InvestmentService);

  readonly tableData = this.investmentService.resultData.asReadonly();
}
