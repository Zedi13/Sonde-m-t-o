CREATE TABLE IF NOT `table_meteo`(
    `releve_id` int(11) NOT NULL AUTO_INCREMENT, 
    `temp` int(11), 
    `hum` int(11),
    `press` int(11),
    `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`releve_id`);
    
)

CREATE TABLE `capteur`(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `nom_capteur` varchar(256) NOT NULL,
    PRIMARY KEY ('id');
)