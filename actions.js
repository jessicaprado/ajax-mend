$(document).ready(function(){

  $('#consoleLog').click(function(){
	  var queryURL =  "https://www.senate.gov/general/contact_information/senators_cfm.xml"

    $.ajax({
    	url: queryURL,
    	method: 'GET',
      dataType: 'xml',
      success: function(data) {

        $(data).find('contact_information member').each(function(){

          var address = $(this).find('address').text().trim().split(' ');
          var street = address[0] + ' ' + address[1] + ' ' + address[2] + ' ' + address[3] + ' ' + address[4] ;
          var city = address[5];
          var state = address[6];
          var postal = address[7];

          var member = {
            firstName: $(this).find('first_name').text(),
            lastName: $(this).find('last_name').text(),
            fullName: $(this).find('first_name').text() + ' ' + $(this).find('last_name').text(),
            chartId: $(this).find('bioguide_id').text(),
            mobile: $(this).find('phone').text(),
            address: [{
              street: street,
              city: city,
              state: state,
              postal: postal
            }]

          }

          var jsonMember = JSON.stringify(member, null, 2);

          console.log(jsonMember);
        })
      },
      error: function() {
        console.log('Failed to GET url');
      }
    })
  });
});
