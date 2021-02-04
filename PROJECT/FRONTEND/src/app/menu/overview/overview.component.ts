import { Component, OnInit } from '@angular/core';
import { Kebab } from 'src/app/models/kebab';
import { KebabRepoService } from 'src/app/utils/kebab-repo.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor(private repo: KebabRepoService) { }

  kebabs: Array<Kebab> = [];

  ngOnInit(): void {
    this.repo.getUpdates().subscribe(kebabs => this.kebabs = kebabs);
    this.repo.getKebabs();
  }

}
