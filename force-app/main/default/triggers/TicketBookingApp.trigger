trigger TicketBookingApp on Concert__c (before insert, before update) {
      for(Concert__c con : trigger.new){
        //check if the no.of tickets remaining is less than 10% of the total tickets available
        if(con.Number_of_Tickets_Remaining__c < (0.1*con.Number_of_Tickets_Available__c)){
            //Ensure that price field is not null
            if(con.Price__c != null){
                //increase the price by 10%
                con.Price__c = con.Price__c*1.1 ;
                System.debug('Price = '+con.Price__c) ;
            }
        }
      }
}