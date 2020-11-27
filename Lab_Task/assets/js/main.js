$(document).ready(function(){
	$('#search').on('keyup',function(){
		var search = $("#search").val();
		var searchby = $("#searchby").val();

		$.ajax({
			url: '/Guser_home/search',
			method: 'post',
			datatype : 'json',
			data : {'search':search,
					'searchby':searchby},
			success:function(response){
				if(response.user !== 'error'){
					var tableBody="<tr><td>country</td><td>general</td><td>cost</td></tr>";
					response.user.forEach(element => { 
						var tableRow="";
						tableRow+="<td>"+element.country+"</td>";
						tableRow+="<td>"+element.general+"</td>";
						tableRow+="<td>"+element.cost+"</td>";
						tableRow += "<td><a href='/user/edit/"+element.nid+"'>Edit</a> | <a href='/user/delete/"+element.nid+"'>Delete</a></td>";
						tableBody=tableBody+"<tr>"+tableRow+"</tr>";
					});
					$('#table').html(tableBody);
				}else{

				}
			},
			error:function(response){
				alert('server error');
			}
		});
	});
});

