<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <title>Home - <?=APP_NAME?></title>

    <link href="<?=ROOT?>/assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <style>
      .bi {
        vertical-align: -.125em;
        fill: currentColor;
      }

    </style>

    <!-- Custom styles for this template -->
    <link href="<?=ROOT?>/assets/css/headers.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
  </head>
  <body style="
    background-image: url('../public/assets/images/star-bg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    color: white;
    font-family: 'Poppins' , sans-serif;font-weight: 500;
    overflow-x: hidden;
    position:relative;
">

  <header class="p-3 border-bottom" style="display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem 1rem;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  height: 65px;
  background-color: rgba(0, 0, 46, 1) !important;">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="<?=ROOT?>" class="nav-link px-2 <?=$url[0] =='home' ? 'link-primary':'link-dark'?>" style="color: white !important; font-size: 1rem;  margin: 8px 15px;">Home</a></li>
          <li><a href="<?=ROOT?>/blog" class="nav-link px-2  <?=$url[0] =='blog' ? 'link-primary':'link-dark'?>" style="color: white !important;font-size: 1rem;margin: 8px 15px;">Blog</a></li>
          <li><a href="<?=ROOT?>/search" class="nav-link px-2  <?=$url[0] =='search' ? 'link-primary':'link-dark'?>" style="color: white !important; font-size: 1rem;margin: 8px 15px;">Search</a></li>
          <li>
            <span class="nav-link px-2 link-dark dropdown text-end">
              <a href="#" class="d-block <?=$url[0] =='category' ? 'link-primary':'link-dark'?> text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style="color: white !important; font-size: 1rem; margin: 8px 15px;">
                Category
              </a>
              <ul class="dropdown-menu text-small">
               
               <?php  

                  $query = "select * from categories order by id desc";
                  $categories = query($query);
                ?>
                <?php if(!empty($categories)):?>
                  <?php foreach($categories as $cat):?>
                    <li><a class="dropdown-item" href="<?=ROOT?>/category/<?=$cat['slug']?>"><?=$cat['category']?></a></li>
                  <?php endforeach;?>
                <?php endif;?>

                
              
              </ul>
            </span>
          </li>
        </ul>

        <form action="<?=ROOT?>/search" class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <div class="input-group ">
            <input value="<?=$_GET['find'] ?? ''?>" name="find" type="search" class="form-control" placeholder="Search..." aria-label="Search" style="    height: 35px; margin: 5px -1px 5px 5px; border: 2px solid orange;">
            <button class="btn btn-primary" style="background-color: #050555; border: 2px solid orange; margin: 5px 5px 5px 0px; height: 35px;">Find</button>
          </div>
        </form>

        <?php if(logged_in()):?>
        <div class="dropdown text-end">
          <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="<?=get_image(user('image'))?>" alt="mdo" style="object-fit: cover;" width="32" height="32" class="rounded-circle">
          </a>
          <ul class="dropdown-menu text-small">
            <li><a class="dropdown-item" href="#">Hi, <?=user('username')?></a></li>
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><a class="dropdown-item" href="<?=ROOT?>/admin">Admin</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="<?=ROOT?>/logout">Sign out</a></li>
          </ul>
        </div>
        <?php endif;?>

      </div>
    </div>
  </header>

  <?php

    if($url[0] == 'home')
      include '../app/pages/includes/slider.php'; 
  ?>

  <main class="p-2">
