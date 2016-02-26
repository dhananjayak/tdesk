# tdesk
Transport desk lets any one monitor transport to and from a particular location. The location can either be a company that wants to monitor their own transport or any corporation.

Transport Desk lets a personnel login (oauth) and then select the location that he/she wants to monitor. The page will be display the map authorized to monitor.

The url to monitor will be /tdesk/monitor

tdesk-role-map-db.firebase.com - will contain a role map that will inform us which person is authorized to monitor which location, and which person can stream to which location.

For each location, a firebase db will be created. 

ex : hyderabad-1 => tdesk-hyderabad-1-db.firebaseio.com
     bangalore-1 => tdesk-bangalore-1-db.firebaseio.com
     
All the vehicles that needs to be monitored will open a url /tdesk/push that will stream their (lat, lng) to their respective database. For a logged in user a location will be mapped.




