-- Creating `users` table
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `budget` INT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- Creating `incomes` table
CREATE TABLE IF NOT EXISTS `incomes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `amount` INT NOT NULL,
  `note` VARCHAR(45) NOT NULL,
  `user_id` INT NOT NULL,
  `date` DATE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_incomes_users_idx` (`user_id`),
  CONSTRAINT `fk_incomes_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Creating `expenses` table
CREATE TABLE IF NOT EXISTS `expenses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `amount` INT NOT NULL,
  `note` VARCHAR(45) NOT NULL,
  `user_id` INT NOT NULL,
  `date` DATE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_expenses_users1_idx` (`user_id`),
  CONSTRAINT `fk_expenses_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;
