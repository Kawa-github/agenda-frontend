
document.addEventListener('DOMContentLoaded',async function() {
        var calendarEl = document.getElementById('calendar');
        let atividade = await $.get('http://localhost:8000/api/home');
    
        let eventos = $.map(atividade, function (a) {
        let id_group = a.id_group
        let name_event = a.name_event
        let date_activity = a.date_activity
        let start = a.start
        let end = a.end

        let events = {
            groupId: id_group,
            title: name_event,
            start : date_activity+'T'+start,
            end: date_activity+'T'+end,
            color: '#cccc00',
        }
        return events
        
         })
        var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'pt-br',
        buttonText: {
            today: 'hoje'
        },

        dateClick: function(info){
            if(info.view.type == 'dayGridMonth'){
                calendar.changeView('timeGrid',info.dateStr)
            }
        },
        events: eventos
    });
    calendar.render();
    });

    $(function(){
        // let date = $('#date_activity').val()
        // let start_form = $('#start').val()
        // let end_form = $('#end').val()
        
        // $('.btn_save').click(function (e) { 
        //     e.preventDefault();
        //     if(end_form <= start_form){
        //         alert('Horário de término deve ser maior que a de início.')
        //         start_form.focus()
        //     }else if(start_form >= '00:00' && end_form <= '05:00'){
        //         alert('Estabelecimento fechado!')
        //     }
        // });
            
        $('.frm_activity').submit(function(e) {
        e.preventDefault();
        const name= $('input[name="name_event"]').val();
        const description = $('textarea[name="description"]').val();
        const date_activity = $('input[name="date_activity"]').val();
        const start = $('input[name="start"]').val();
        const end = $('input[name="end"]').val();

        $.ajax({
            url: 'http://localhost:8000/api/cadastro', 
            type: 'POST',
            data: {name_event: name, description: description, date_activity: date_activity, start: start, end: end},
            success: function(response) {
                Swal.fire(
                    'Atividade registrada!',
                    name + ' no dia ' + moment(date_activity).format('DD/MM/YYYY') 
                    + ' as ' + start + ' até ' + end,
                    'success'
                )
                setTimeout([
                    location.reload()
                ],3000)
            },
            error: function(xhr, status, error) {
                alert(xhr.responseText);
            }
        });
        return false;
     });
    })