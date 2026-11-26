import { LightningElement } from 'lwc';
import getTickets from '@salesforce/apex/TicketBookingClass.getTickets'
import {ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class TicketBookingApplication extends LightningElement {
    showPrice;
    recordId;
    showModal = false ;

    handleSuccess(event){
        //Toast event
        this.recordId = event.detail.id;
        console.log(event.detail.id);
        const evt = new ShowToastEvent({
            title : 'Ticket Booked ',
            message : 'RecordID :' + event.detail.id,
            variant : 'success'

        });
        this.dispatchEvent(evt);
        this.showModal = true;

    }
    handleChange(event){
        //create variable
        let targetId =  event.target.value;

        console.log(targetId);
        //make an imperative call to fetch the price 
        getTickets({recordId: targetId})
        .then((data)=>{
             this.showPrice=data;
             console.log(data);

             const evt = new ShowToastEvent({
                title : 'Price has been updated successfully',
                message : ' concert price has been successfully updated! '
             });
             this.dispatchEvent(evt);
        })
        .catch((error)=>{
            console.log(error);
            const evt = new ShowToastEvent({
                title : 'unable to process',
                message : ' price has not updated',
                variant : 'error'
            });
            this.dispatchEvent(evt);
        })
    }
    closeModal(){
        this.showModal= false;
    }

}