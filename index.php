
<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wazzup Test</title>

    <!-- Vue -->
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>



    <!-- Bootstrap  -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>


    <style>
        .no-hover:hover{
            background: white !important;
        }
        .pointer{
            cursor:pointer;
        }
        .hover-elem{
            cursor:pointer;
        }
        .hover-elem:hover{
            opacity: 0.7 ;
        }
        .modal{
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0,0,0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
        }

    </style>

</head>

<body>
    <div id="app" class="container-fluid">
        <button class="btn btn-success m-3" @click="getUsers">Обновить данные</button>
        <user-table ref="userTable" :data='datatable' :colums='columstable' @showmodal="showModal"></user-table>
        <div v-if="viewModal" class="modal" @click="closeModal">
            
            <div class="container bg-light modal-container p-5" @click.stop>
                <div class="container text-right" >
                    <button class="btn btn-danger" @click="closeModal">X</button>
                </div>
                <sel-user :name="selName" :adress_info="selAdress"  @keyup.esc="closeModal"></sel-user>
            </div>
        </div>
        
    </div>
    <script src="app.js"></script>
</body>

</html>