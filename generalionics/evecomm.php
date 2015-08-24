<?php

	# == CONFIG == #
	$baseURL = "https://api.eveonline.com/";
	
	$keyID = 4622419;
	$vCode = "dty6KJP4ATvHfbx8vC2d5sSJWUMVwqfT4HhMLHQHfXP44CoGUVDwJoAdjAtmHv8u";
	# == CONFIG == #

	function getXML($targetURL) {
		
		$sxml = simplexml_load_file($baseURL . $targetURL . ".xml.aspx?keyID=" . $keyID . "&vCode=" . $vCode . "&corporationID=" . $corpID);
		
		return $sxml;
		
	}

?>