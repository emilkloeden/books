module.exports = [
  {
    image: {
      src: "/page1.jpg"
    },
    text: {
      ocr: `This is a very long string
        
        that is also multiline!`,
      proofs: [
        {
          id: 1,
          who: "me",
          status: "final",
          text: `This is a very long string
        
                that is also multiline?`
        },
        {
          id: 1,
          who: "me",
          status: "allocated",
          text: `This is a very long string
        
                that is also multiline!`
        }
      ]
    }
  }
];
