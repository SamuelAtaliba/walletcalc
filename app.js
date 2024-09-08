new Vue({
  el: '#app',
  data: {
      investmentAmount: null,
      results: {},
      showReport: false,
      currentDate: '',
      tijoloAmount: 0,
      papelAmount: 0,
      darkMode: false
  },
  methods: {
      calculateInvestments() {
          const amount = parseFloat(this.investmentAmount);

          if (!isNaN(amount) && amount > 0) {
              this.tijoloAmount = (amount * 0.7).toFixed(2);
              this.papelAmount = (amount * 0.3).toFixed(2);

              this.currentDate = new Date().toLocaleDateString();
              this.showReport = true;
          } else {
              alert('Por favor, insira um valor válido.');
              this.showReport = false;
          }
      },
      downloadPDF() {
          const { jsPDF } = window.jspdf;
          const doc = new jsPDF();

          doc.text(`Relatório de Investimentos - ${this.currentDate}`, 10, 10);
          doc.text('Fundos Imobiliários de Tijolo (70%)', 10, 20);
          doc.text(`Total: R$ ${this.tijoloAmount}`, 10, 30);

          doc.text('Fundos de Papel (30%)', 10, 40);
          doc.text(`Total: R$ ${this.papelAmount}`, 10, 50);

          doc.save(`Relatorio_Investimentos_${this.currentDate.replace(/\//g, '-')}.pdf`);
      },
      toggleDarkMode() {
          this.darkMode = !this.darkMode;
          document.body.classList.toggle('dark-mode', this.darkMode);
      }
  }
});
