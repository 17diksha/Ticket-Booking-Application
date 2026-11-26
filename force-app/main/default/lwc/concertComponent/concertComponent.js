import { LightningElement,wire, track } from 'lwc';
import getConcerts from '@salesforce/apex/TicketBookingClass.getConcerts';
import { NavigationMixin} from 'lightning/navigation';

export default class ConcertComponent extends NavigationMixin(LightningElement) {
    Concertdata;
    @track columns = [ { label: 'Name' , fieldName: 'Name'},
                        { label: 'Price' , fieldName: 'Price__c'},
                        { label: 'Date of Concerts' , fieldName: 'Date_of_Concert__c'}

    ];
    @wire (getConcerts) wireConcert({data, error}){
        if(data){
            this.Concertdata = data;
            console.log(data);
        }


    }
    navToTicketBookingComp(){
        let compDef = {
            componentDef : "c:ticketBookingApplication"
        };
        let encodedDef = btoa(JSON.stringify(compDef));
        this[NavigationMixin.Navigate]({
            type :  "standard__webPage",
            attributes:{
                url: "/one/one.app#" + encodedDef
            }
        });
    }

}