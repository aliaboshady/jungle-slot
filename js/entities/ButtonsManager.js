class ButtonsManager
{
  constructor(scene)
  {
    this.scene = scene;
    this.moneyManager;
    this.winLinesManager;
    this.disableTint = 0x6E6E6E;
    this.buttonsEnabled = true;
  }

  setMoneyManager(moneyManager)
  {
    this.moneyManager = moneyManager;
  }

  setWinLinesManager(winLinesManager)
  {
    this.winLinesManager = winLinesManager;
  }

  addButtons()
  {
    this.spinButton = this.scene.add.image(CENTERX, 685, 'spinButton').setInteractive().on('pointerdown', this.onSpinBet, this);
    this.spinButton.setDepth(2);
    Align.scaleToGameW(this.spinButton, 0.2);
    Align.scaleToGameW(this.scene.add.image(CENTERX, 685, 'leaves').setDepth(2), 0.2);

    this.betButton = this.scene.add.image(370, 685, 'betButton').setInteractive().on('pointerdown', this.onClickBet, this);
    this.betButton.setDepth(3);
    Align.scaleToGameW(this.betButton, 0.1);
    this.betText = this.scene.add.text(368, 695, '£' + (this.moneyManager.bet / 100).toFixed(2), {fontSize: 18}).setOrigin(0.5, 0.5).setDepth(3);

    this.linesButton = this.scene.add.image(530, 685, 'linesButton').setInteractive().on('pointerdown', () => {this.onLinesBet(true)}, this).on('pointerup', () => {this.onLinesBet(false)}, this);
    this.linesButton.setDepth(3);
    Align.scaleToGameW(this.linesButton, 0.1);

    this.autoStartButton = this.scene.add.image(1000, 685, 'autoStartButton').setInteractive().on('pointerdown', () => {}, this);
    this.autoStartButton.setDepth(3);
    Align.scaleToGameW(this.autoStartButton, 0.1);

    this.creditsButton = this.scene.add.image(1160, 685, 'creditsButton');
    this.creditsButton.setDepth(3);
    Align.scaleToGameW(this.creditsButton, 0.1);
    this.creditsText = this.scene.add.text(1160, 695, '£' + (this.moneyManager.credits / 100).toFixed(2), {fontSize: 18}).setOrigin(0.5, 0.5).setDepth(3);

    this.wonButton = this.scene.add.image(1320, 685, 'wonButton');
    this.wonButton.setDepth(3);
    Align.scaleToGameW(this.wonButton, 0.1);
    this.wonText = this.scene.add.text(1320, 695, '£' + (this.moneyManager.won / 100).toFixed(2), {fontSize: 18}).setOrigin(0.5, 0.5).setDepth(3);
  }

  onSpinBet()
  {
    if(!this.buttonsEnabled) return;
    this.scene.reelsManager.onClickSpin();
  }

  onLinesBet(down)
  {
    if(!this.buttonsEnabled) return;
    this.winLinesManager.drawWinLines(down);
  }

  onClickBet()
  {
    if(!this.buttonsEnabled) return;
    this.moneyManager.updateBet();
    this.betText.setText('£' + (this.moneyManager.bet / 100).toFixed(2));
  }

  updateCredits(credits)
  {
    this.creditsText.setText('£' + (credits / 100).toFixed(2));
  }

  updateWon(won)
  {
    this.wonText.setText('£' + (won / 100).toFixed(2));
  }

  enableButtons(enbale = true)
  {
    this.buttonsEnabled = enbale;
    this.spinButton.setTint(enbale ? 0xFFFFFF : this.disableTint);
    this.linesButton.setTint(enbale ? 0xFFFFFF : this.disableTint);
    this.betButton.setTint(enbale ? 0xFFFFFF : this.disableTint);
  }
}