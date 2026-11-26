public with sharing class TicketBookingClass {
    @AuraEnabled (cacheable=true)
    public static Decimal getTickets(Id recordId){
        System.debug('Inside debug');

        Decimal  concerts =[SELECT Id, 
                            Name,
                            Price__c FROM Concert__c
                            where Id =: recordId ].Price__c;
        return concerts;
         
    }

    //method 2 we want to fetch upcoming concert details
    @AuraEnabled ( cacheable = true)
    public static List<Concert__c> getConcerts(){
        //soql query to fetch the concerts data
        
        return[Select Id , Name , Date_of_Concert__c , Price__c from Concert__c
                where Date_of_Concert__c > TODAY
                order by Date_of_Concert__c ASC];

    }
     

    
}