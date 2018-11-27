<?php include 'header.php'; ?>
<!-- page-content-wrapper -->
<div id="page-content-wrapper" class="page-content-toggle">
<div class="container-fluid">

<div class="row">
<div id="content" class="col-md-8 col-md-offset-1 col-xs-12">
<div id="chartContainer"></div>

<?php
    $file = fopen('../scores.json', 'r');
    $scores = json_decode(fgets($file));
    fclose($file);

    $data = [];

    $top = 0;

    for ($i=0; $i < count($scores); $i++) {
        if ($scores[$i] > $top) {
            $top = $scores[$i];
        }
    }

    for ($i=0; $i < $top; $i++) {
        $data[$i] = 0;
    }

    for ($i=0; $i < count($scores); $i++) {
        $score = $scores[$i];

        if (isset($data[$score])) {
            $data[$score]++;
        }
    }

    ksort($data);

    foreach ($data as $key => $value) {
        $dataPoints[] = ['y' => $value, 'label' => $key];
    }
?>

<script type="text/javascript">

    console.log(<?php echo json_encode($data) ?>);

    $(function () {
        var chart = new CanvasJS.Chart("chartContainer", {
            theme: "theme2",
            animationEnabled: true,
            title: {
                text: "DLTRTTTBT Scores"
            },
            data: [
            {
                // type: "column",
                type: "column",
                dataPoints: <?php echo json_encode($dataPoints, JSON_NUMERIC_CHECK); ?>
            }
            ]
        });
        chart.render();
    });
</script>
