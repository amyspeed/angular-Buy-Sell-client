import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from '../listings.service';
import { Listing } from '../types';

@Component({
  selector: 'app-listing-detail-page',
  templateUrl: './listing-detail-page.component.html',
  styleUrls: ['./listing-detail-page.component.css']
})
export class ListingDetailPageComponent implements OnInit {
  isLoading: boolean = true;
  listing: Listing;

  constructor(
    private route: ActivatedRoute,
    private listingsService: ListingsService,
  ) { }

  incrementViews(id, listing) {
    this.listingsService.patchViewToListing(id, listing.views)
      .subscribe(() => console.log('Views Updated'))
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.listingsService.getListingById(id)
      .subscribe(listing => {
        this.listing = listing;
        this.isLoading = false;
        this.incrementViews(id, this.listing);
      });
  };
}
