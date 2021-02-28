<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./style/style.css">
</head>
<body class="step_one-background">
    <div class="nav">
        <a href = "./index.html" class="logo">pixel-art</a>
        <a href = "./index.html" class = "button">&ltback</a>
    </div>
    <div class="select">
        <span>select type of game</span><br>
        <div class="selected_wrapper type">
            <div  class="button mode" data-mode = "1">1</div>
            <img src="./img/first_mode.PNG" class = "img_first" alt="">
            <div  class="button mode" data-mode = "2">2</div>
            <img src="./img/second_mode.png" class = "img_second" alt="">
        </div>
    </div>
    <div class="select">
        <span>select size of canvas</span><br>
        <div class="selected_wrapper">
            <?php
                
                $size;
                $list = array_slice(scandir('pictures'),2);
                for($i = 0; $i < count($list); $i++){
                    
                    $picture = file_get_contents("./pictures/$list[$i]"); 
                    $rows = explode(";",$picture);
                    $len = count($rows) - 1;
                    $size[$i] = $len;
                    
                }
                $filtersize = array_unique($size);
                sort($filtersize);
                for($i = 0; $i < count($size); $i++){
                    if($filtersize[$i] != ''){
                        echo "<div class = 'button size' data-size = {$filtersize[$i]}>{$filtersize[$i]}</div>";
                    }
                }
                
            ?>
        </div>
    </div>
    <div class="select">
        <span>select image</span><br>
        <div class= "selected_image-wrapper">
            <?php 
                $list = array_slice(scandir('pictures'), 2);
                for($i = 0;$i<count($list);$i++){
                    
                        $picture = file_get_contents("./pictures/$list[$i]");
                        $rows = explode(";",$picture);
                        $name = substr($list[$i],3,-4);
                        $len = count($rows)-1;
                        echo "<a href = 'canvas.html' data-info = '{$picture}' data-size = '{$len}' class = 'picture'>{$name}<table style = 'border-collapse: collapse;width: 200px;height 200px;'>";
                        for($j = 0; $j < $len;$j++){
                            $color = explode(' ',$rows[$j]);
                            echo "<tr>";
                            $countColor = 200/count($color);
                            $countLol = "{$countColor}px";
                            for($k = 0;$k<count($color);$k++){
                                echo "<td style = 'background-color: $color[$k];width: $countLol;height: $countLol;'></td>";
                            }
                            echo "</tr>";
                        }
                        echo "</table></a>";  
                    
                }
            ?>
        </div>  
    </div>
    <script src='./js/main.js'></script>
</body>
</html>