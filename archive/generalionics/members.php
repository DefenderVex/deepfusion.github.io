<!DOCTYPE html>
<html lang="en">
	<head>
		<title>General Ionics</title>
		
		<link href="css/bootstrap.min.css" rel="stylesheet">
		
		<link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">
		
		<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
		<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->
	</head>
	
	<body>
		<!-- == START OF NAV == -->
		<nav class="navbar navbar-static-top">
			<div class="container">
				<a class="navbar-brand" href="#">General Ionics</a>
				<ul class="nav navbar-nav navbar-right">
					<li><a href="index.html">Home</a></li>
					<li><a href="members.php">Members</a></li>
					<li><a href="shareholders.php">Shareholders</a></li>
				</ul>
			</div>
		</nav>
		<!-- == END OF NAV == -->
		
		<!-- == START OF CONTENT == -->
		<div class="container">
			<div class="col-lg-12"><h1 class="page-header">Corporation Members</h1></div>

<?php
	
	# == CONFIG == #
	$corpID = 98414469;
	$keyID = 4622419;
	$vCode = "dty6KJP4ATvHfbx8vC2d5sSJWUMVwqfT4HhMLHQHfXP44CoGUVDwJoAdjAtmHv8u";
	
	$URL = "corp/MemberTracking.xml.aspx";
	# == CONFIG == #
	
	$sxml = simplexml_load_file("https://api.eveonline.com/" . $URL . "?keyID=" . $keyID . "&vCode=" . $vCode . "&corporationID=" . $corpID);
	
	foreach ($sxml->result->rowset->row as $row) {
		$name = $row->attributes()->name;
		$characterID = $row->attributes()->characterID;
		$titleName = $row->attributes()->title;

		echo '<div class="col-md-3">';
		echo '<div class="panel panel-default">';
		echo '<div class="panel-body">';
		echo '<img class="img-responsive center-block img-circle" src="https://image.eveonline.com/Character/' . $characterID . '_200.jpg">';
		echo '<h4>'.$name.'</h4>';
		echo '<h5>'.$titleName.'</h5>';
		echo '</div>';
		echo '</div>';
		echo '</div>';
	}

?>
		</div>
		<!-- END OF CONTENT == -->
		
		<!-- == START OF FOOTER == -->
		<!--<footer style="background-color: black;">
			<div class="container">
				<h5>EVE Online and all related concepts therein are the property of CCP Games, this website is not affiliated with CCP Games.<h5>
			</div>
		</footer>-->
		<!-- == END OF FOOTER == -->
		
		<!-- == START OF SCRIPTS == -->
		<script src="js/jquery.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<!-- == END OF SCRIPTS == -->
	</body>
</html>