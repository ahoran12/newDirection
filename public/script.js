var player = {
  age: 0,
  name: "",
  assets: [],
  yearlyEvents: [],
  gender: "", 
  stage: function () {
    if (this.age < 6) {
      return "youngChild";
    } else if (this.age >= 6 && this.age < 13) {
      return "child";
    } else if (this.age >= 13 && this.age < 18) {
      return "teen";
    } else if (this.age >= 18 && this.age < 22) {
      return "youngAdult";
    } else if (this.age >= 22 && this.age < 65) {
      return "adult";
    } else {
      return "elderly";
    }
  },

  occupation: function () {
    if (this.age < 6) {
      return "Child";
    } else if (this.age >= 6 && this.age < 18) {
      return "Student";
    } else {
      return "Unemployed"; // Now handles the unemployed case
    }
  },
  toString: function () {
    let string =
      this.name +
      " is a " +
      this.age +
      " year old " +
      this.gender +
      ". ";
    if (this.age>= 18) {
      string += "Their job is " +
      this.occupation() + ". "
    }
    let owns = "nothing";
    if (this.assets.length > 0) {
      owns = "";
      this.assets.forEach((asset) => (owns += "a " + asset + ", "));
    }
    let events = "";
    if (this.yearlyEvents.length > 0) {
      this.yearlyEvents.forEach((event) => (events = events + event + ", "));
      // Clear yearly events after processing
      this.yearlyEvents = [];
      this.yearlyEvents.length = 0;
    } else {
      events = "did nothing";
    }
    string =
      string +
      this.name +
      " owns " +
      owns +
      ". This year, " +
      this.name +
      " " +
      events +
      ".";
    console.log(string);
    return string;
  },
};

const OCCUPATIONS = {
  college: ["Teacher", "Doctor", "Lawyer", "CEO", "Professor", "unemployed"],
  noCollege: [
    "CEO",
    "unemployed",
    "Truck Driver",
    "Farmer",
    "Soldier",
    "Electrician",
  ],
};

const randEvents = {
  youngChild: [
    {
      message: "A stranger offers you candy. Do you take it?",
      a: {
        display: "Yes",
        GPT: "ate candy from a stranger that was poisoned and made them very ill",
      },
      b: {
        display: "No",
        GPT: "refused candy from a stranger who was later seen on the news as a wanted serial killer",
      },
    },
    {
      message:
        "Your nanny Kayleigh left the front door open. Do you go outside?",
      a: {
        display: "Yes! I love adventures.",
        GPT: "wandered outside unsuupervised because their babysitter left the door open and tried to build a sand castle out of an ant hill (it was very painful)",
      },
      b: {
        display: "No! Mommy says that is dangerous.",
        GPT: "stayed inside when the door was left open and avoided harm",
      },
    },
    {
      message:
        "A girl comes up to you at the playground and asks to play a game. Do you want to play?",
      a: {
        display: "Yes",
        GPT: "played a riveting game of jacks at the playground with a random girl and made a new best friend (for the day); you got to keep the marble",
      },
      b: {
        display: "No",
        GPT: "refused to play jacks with an unknown girl at the playground and made her cry by not being her friend",
      },
    },
    {
      message: "You find a lost puppy in your backyard. Do you try to help it?",
      a: {
        display: "Yes, I want to help!",
        GPT: "helped a lost puppy in their backyard and became a local hero; the puppy's owners were so grateful they let you name their next pet",
      },
      b: {
        display: "No, it could be dangerous.",
        GPT: "stayed away from a lost puppy in their backyard; it turned out to be a rare breed and the owners offered a reward for its safe return",
      },
    },
    {
      message:
        "You see a big red button that says 'Do Not Press'. Do you press it?",
      a: {
        display: "Yes, I'm too curious!",
        GPT: "pressed a big red button marked 'Do Not Press' and accidentally set off the house alarm, causing a brief panic but learning a valuable lesson",
      },
      b: {
        display: "No, I follow rules.",
        GPT: "resisted pressing a tempting red button and later found out it was a test of obedience; they were praised for their self-control",
      },
    },
    {
      message:
        "Your friend dares you to climb the tall tree in the park. Do you climb it?",
      a: {
        display: "Yes, I love challenges!",
        GPT: "climbed the tall tree on a dare and enjoyed a magnificent view, but got stuck and had to be rescued by firefighters",
      },
      b: {
        display: "No, it's too risky.",
        GPT: "refused to climb a tall tree on a dare, staying safe; the friend who dared them fell and learned why it's important to be cautious",
      },
    },
    {
      message: "It's raining heavily and you want to play outside. Do you go?",
      a: {
        display: "Yes, rain is fun!",
        GPT: "played in the rain and had a great time making mud pies, but caught a cold from being wet and cold for too long",
      },
      b: {
        display: "No, I'll stay dry inside.",
        GPT: "chose not to play in the rain and stayed healthy; they spent the time learning a new indoor game and had a great time",
      },
    },
  ],
  child: [
    {
      message:
        "Your mom says you can have a pet! You go to the pet store and cannot decide between a fluffy puppy or cute cockroach. Which will you choose?",
      a: {
        display: "The puppy! It's so soft!",
        GPT: "adopted a cute puppy that threw up on everything then died",
      },
      b: {
        display: "The cockroach is too cute to leave behind.",
        GPT: "adopted a pet cockroach named Percy who is loyal and follows them everywhere",
        action: () => {
          player.assets.push("beloved pet cockroach named Percy");
        },
      },
    },
    {
      message:
        "You feel ill and like you shouldn't go to school. Do you tell your parents?",
      a: {
        display: "Yes",
        GPT: "told their mom they didn't feel well and that they shouldn't go to school but their mom didn't believe them; they embarassed themselves by throwing up on the teacher",
      },
      b: {
        display: "No",
        GPT: "declined to tell their mom they were too sich to go to school; they threw up all over the teacher and were very embarassed.",
      },
    },
    {
      message:
        "Samantha started a rumor that you still shower with your mom. What do you do?",
      a: {
        display: "Start a rumor she has a crush on the weird kid",
        GPT: "successfully started a rumor that Samantha was into the weird kid in the class after Samantha started a rumor that they still shower with their mom.",
      },
      b: {
        display: "Embrace it. Why hide the truth?",
        GPT: "got mocked mercilously for still showering with their mother after owning up to the rumor Samantha started",
      },
    },
    {
      message:
        "There's a new kid at school who seems shy. Do you talk to them?",
      a: {
        display: "Yes, I'll be friendly!",
        GPT: "befriended the new shy kid at school and found out they have amazing stories to tell; they became great friends",
      },
      b: {
        display: "No, I'm shy too.",
        GPT: "didn't approach the new shy kid at school; later, they became a famous artist and remembered those who were kind to them when they were unknown",
      },
    },
    {
      message:
        "You find a mysterious key in the garden. Do you try to find what it opens?",
      a: {
        display: "Yes, it's a treasure hunt!",
        GPT: "used a mysterious key found in the garden to unlock an old shed and discovered old family heirlooms, sparking an interest in family history",
      },
      b: {
        display: "No, it's not mine.",
        GPT: "left a mysterious key found in the garden alone and it turned out to be the neighbor's lost key; they were very grateful it was not lost",
      },
    },
  ],
  teen: [
    {
      message: "Your friend offers you a cigarett. Want to try it?",
      a: {
        display: "Sure, it smells good.",
        GPT: "tried a cigarette that resulted in a severe nicotine addction and their mom threatened to send them to rehab",
      },
      b: {
        display: "No, smoking is nasty.",
        GPT: "declined the offer to try a cigarette and avoided becoming an addict",
      },
    },
    {
      message: "A bully challenges you to a fight after school. Do you do it?",
      a: {
        display: "Yes! I have the power of God and Anime on my side.",
        GPT: "got into a fight with a bully at school and ended up dangling from the flag pole by their underwear after trying to embarassingly fight like an anime character; Their nickname the rest of the year was capitan underpants",
      },
      b: {
        display:
          "No, only someone as stupid as him would think that's a good idea.",
        GPT: "declined to fight a bully at school and was mocked for being weak",
      },
    },
    {
      message:
        "Your mom thinks you're just going through a phase and will not let you get a face tattoo. What do you do?",
      a: {
        display:
          "This is the real me! I am running away to be who I really am.",
        GPT: "ran away from home because their mom wouldn't let them get a face tattoo claiming it is 'just a phase' and they feel like this is the real them; they came back home an hour later because they wanted the dinosaur nuggets their mom was making for dinner",
      },
      b: {
        display:
          "Too bad. My buddy can do it in his basement without her signing off.",
        GPT: "tried to get a stick-and-poke tattoo on their friend's basement because their mom wouldn't let them get a one claiming it is 'just a phase' and they feel like this is the real them; the needle barely grazed their face and they passed out from fear then went home without a tattoo",
      },
    },
    {
      message:
        "You're invited to a party where you know there will be alcohol. Do you go?",
      a: {
        display: "Yes, I want to socialize.",
        GPT: "went to the party and navigated the challenges of peer pressure, learning valuable lessons about making responsible choices in social settings",
      },
      b: {
        display: "No, I don't feel comfortable.",
        GPT: "decided not to attend the party with alcohol, focusing on their personal values and safety; they ended up having a great night with another group of friends",
      },
    },
    {
      message:
        "There's a big test tomorrow, but your friends are playing video games tonight. Do you join them?",
      a: {
        display: "Yes, games are fun!",
        GPT: "chose gaming over studying and had a great time, but their test score suffered, leading to a realization about balancing fun and responsibilities",
      },
      b: {
        display: "No, I need to study.",
        GPT: "skipped gaming for study and aced the test, which boosted their confidence and reinforced the importance of prioritizing their education",
      },
    },
    {
      message: "Your crush asks you to skip class with them. Do you go?",
      a: {
        display: "Yes, it's a rare chance!",
        GPT: "skipped class with their crush, which was thrilling but resulted in detention, teaching them about weighing short-term fun against long-term consequences",
      },
      b: {
        display: "No, I value my education.",
        GPT: "politely declined their crush's invitation to skip class, earning respect for their dedication to education and setting positive boundaries",
      },
    },
  ],
  youngAdult: [
    {
      message:
        "You feel like all of your friends are getting married and having babies. How do you cope?",
      a: {
        display: "Obsess over all their Facebook posts about it",
        GPT: "fell into a deep depression about not being married and having kids like all of their friends; it is really messing with their wellbeing",
      },
      b: {
        display: "Ignore it. Who cares?",
        GPT: "chose to not obsess over other people's lives and focus on improving themself",
      },
    },
    {
      message: "Someone offered you $50 for feet pics. Will you do it?",
      a: {
        display: "Yes. Easiest $50 of my life.",
        GPT: "sold feet pics to a stranger for $50 and was told they had 'really nice feet'",
        action: () => {
          player.assets.push("$50");
          player.assets.push("some 'really nice feet'");
        },
      },
      b: {
        display: "No. That's weird.",
        GPT: "missed out on an easy $50 by not selling their feet pics",
      },
    },
    {
      message:
        "You start feeling like calling yourself a " +
        player.gender +
        " doesn't describe you. Want to transition?",
      a: {
        display: "Yes. I have never felt right in this body.",
        GPT:
          "transitioned from being a " +
          player.gender +
          " and feels like they are living their authentic life",
        action: () => {
          if (player.gender == "male") {
            player.gender = "female";
          } else {
            player.gender = "male";
          }
        },
      },
      b: {
        display: "No. This is just a passing thought",
        GPT: "briefly thought about transitioning but decided against it",
      },
    },
    {
      message:
        "You accidentally send a romantic text meant for your partner to your boss. What's the fallout?",
      a: {
        display: "It's super awkward",
        GPT: "sent a romantic text to their boss by mistake, leading to an embarrassing but funny conversation, and surprisingly, a more relaxed work environment",
      },
      b: {
        display: "Your boss finds it hilarious",
        GPT: "had their boss receive the romantic text, who found it hilarious and shared a story of their own similar mistake, improving their relationship",
      },
    },
    {
      message:
        "You're offered a chance to travel to a mystery destination for free. Do you go?",
      a: {
        display: "Absolutely, adventure calls",
        GPT: "embraced the mystery travel opportunity, ending up in a beautiful, remote location, which turned out to be a setup for a reality show audition",
      },
      b: {
        display: "No, sounds too risky",
        GPT: "decided against the mystery travel offer, only to find out later it was a trip to Paris; however, they used the time to explore local hidden gems",
      },
    },
    {
      message:
        "You can take a class for a skill you'll never use in real life. What do you choose?",
      a: {
        display: "Learn to juggle flaming torches",
        GPT: "mastered juggling flaming torches in a class, never using the skill in real life but becoming a legend at every party they attended",
      },
      b: {
        display: "Become a certified ninja",
        GPT: "took a ninja class, acquiring skills they never really used but once impressively caught a falling glass in a ninja-like reflex, to everyone's amazement",
      },
    },
  ],
  adult: [
    {
      message:
        "The IRS claims you haven't filed taxes for your side hustle as a dog massuer. You haven't but they can't know that. What do you do?",
      a: {
        display: "Falsify Documents",
        GPT: "filed fake documents with the IRS who tried to get them on tax fraud for not filing taxes for their dog massuer side hustle; the IRS bought it",
      },
      b: {
        display:
          "Tell them you don't owe taxes because you are a soverign citizen",
        GPT: "tried to claim they were a soverign citizen to the IRS to not have to pay taxes for their dog masseur side hustle; the IRS did not buy it and they became a meme because of the resulting YouTube video of them arguing with the police",
      },
    },
    {
      message: "After lots of saving, you can finally buy a house. Should you?",
      a: {
        display: "Yes! It's the American Dream.",
        GPT: "bought their dream home",
        action: () => {
          player.assets.push(
            "a cute mid-century home with a white picket fence"
          );
        },
      },
      b: {
        display: "Yes. It'll be a good investment.",
        GPT: "bought a fixer-upper home as an investment but the poor DIY repairs caused an electrical fire that totaled the house",
      },
    },
    {
      message:
        "Your local mayor has the intelligence of a Georgia student and the charisma of a Georgia Tech student. Will you challenge him this election?",
      a: {
        display: "Yes, I am the best person for the job.",
        GPT: "ran for mayor and won by a landslide",
        action: () => {
          player.occupation = () => {
            return "mayor";
          };
        },
      },
      b: {
        display:
          "No, I have better things to do that try to please the idiots who thought he was a good choice.",
        GPT: "decided not to run for mayor and remained bitter about the current mayor",
      },
    },
    {
      message:
        "You're offered a dream job in a new city, but it means leaving your friends and family behind. Do you take it?",
      a: {
        display: "Take the job",
        GPT: "Never mind, the offer fell through, layoffs amirite.",
      },
      b: {
        display: "Decline it",
        GPT: "Its okay! the company went bankrupt the next week",
      },
    },
    {
      message:
        "You're offered a chance to travel to a mystery destination for free. Do you go?",
      a: {
        display: "Absolutely, adventure calls",
        GPT: "embraced the mystery travel opportunity, ending up in a beautiful, remote location, which turned out to be a setup for a reality show audition",
      },
      b: {
        display: "No, sounds too risky",
        GPT: "decided against the mystery travel offer, only to find out later it was a trip to Paris; however, they used the time to explore local hidden gems",
      },
    },
    {
      message:
        "You can take a class for a skill you'll never use in real life. What do you choose?",
      a: {
        display: "Learn to juggle flaming torches",
        GPT: "mastered juggling flaming torches in a class, never using the skill in real life but becoming a legend at every party they attended",
      },
      b: {
        display: "Become a certified ninja",
        GPT: "took a ninja class, acquiring skills they never really used but once impressively caught a falling glass in a ninja-like reflex, to everyone's amazement",
      },
    },
  ],
  elderly: [
    {
      message:
        "Microsoft called you and said your bank was hacked and they can help you. Do you want their help?",
      a: {
        display:
          "Of course. The man on the phone said he was Bill Gates. He's a smart man, so he'll definitely know what to do.",
        GPT: "accepted help from scammers claiming to be Bill Gates from Microsoft trying to help them recover their hacked bank account; their identity was stolen",
      },
      b: {
        display:
          "No way! Why would I trust them? Bill Gates made the pandemic to mind control us!",
        GPT: "got suspicious of the people from 'microsoft' calling them to help because their bank was hacked; they avoided being scammed because of their skepticism of Bill Gates after he 'made the COVID'",
      },
    },
    {
      message:
        "Your friends are going to rob a bank and need a get away driver. Are you in?",
      a: {
        display: "Sure. I want to feel young again.",
        GPT: "was the get away driver for a successful bank robery; they bought a lifetime supply of pudding with their cut",
        action: () => {
          player.assets.push("a lifetime supply of pudding");
        },
      },
      b: {
        display: "No. I'm too old and frail for jail!",
        GPT: "declined to rob a bank with their friends and had regret after for letting their friends down and not getting millions of dollars, friends never got caught!",
      },
    },
    {
      message:
        "Your grandson can not read cursive but needs to understand an old lettter for class. Do you help him?",
      a: {
        display: "Yes. I like being useful.",
        GPT: "bonded with their granddson by helping him read cursive for a school assignment",
      },
      b: {
        display:
          "No. He is too old to not know how. How does he even write without cursive?",
        GPT: "was rude and ornery about the 'lazy' younger generation not knowing how to read cursive after their grandson asked them for help reading cursive for a class; this same person cannot even navigate Netflix with a TV remote",
      },
    },
    {
      message:
        "After spending a night at a questionable motel with a hook up, you start feeling unwell. What do you do?",
      a: {
        display: "Ignore it, probably just tired",
        GPT: "ignored the symptoms after staying at a motel, only to find out they had contracted the clap!",
      },
      b: {
        display: "See a doctor immediately",
        GPT: "went to a doctor after feeling unwell from a motel stay, discovering they had an easily treatable but rare skin reaction to the bed's detergent",
      },
    },
    {
      message:
        "You're about to start a major home renovation but discover a rare bird nesting in the area. Do you proceed?",
      a: {
        display: "Proceed with the renovation",
        GPT: "Went ahead with the renovation, facing backlash from local wildlife enthusiasts, they set your porch on fire!",
      },
      b: {
        display: "Delay for the bird",
        GPT: "Chose to delay the renovation for the bird, earning praise from the community and discovering a newfound interest in local wildlife conservation",
      },
    },
  ],
};
document.getElementById("playerName").addEventListener("input", function() {
    var inputElement = this;
    var inputValue = inputElement.value;
    
    if (inputValue.length > 0) {
        var capitalizedValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
        inputElement.value = capitalizedValue;
    }
});
//EVENT LISTENER FOR START GAME
document.getElementById("startGame").addEventListener("click", () => {
  startGame();
});
//AGE UP BUTTON
document.getElementById("ageUp").addEventListener("click", () => {
  ageOneYear();
});
var avatarSrc;
// Function to start the game
function startGame() {
  player.name = document.getElementById("playerName").value.trim();
  if (player.name === "") {
    alert("Please enter a name to start the game.");
    return;
  }
    // Get the selected gender value from the radio buttons
    player.gender = document.querySelector('input[name="gender"]:checked').value;
  //arrays of avatars  
  const maleAvatars = [
        "https://cdn.glitch.global/12634f73-487e-48d6-84dc-63b6721aef3d/male1.png?v=1701799965026",
        "https://cdn.glitch.global/12634f73-487e-48d6-84dc-63b6721aef3d/male2.png?v=1701801343781",
        "https://cdn.glitch.global/12634f73-487e-48d6-84dc-63b6721aef3d/male3.png?v=1701801348857"
    ];
    const femaleAvatars = [
        "https://cdn.glitch.global/12634f73-487e-48d6-84dc-63b6721aef3d/female3.png?v=1701801237586",
        "https://cdn.glitch.global/12634f73-487e-48d6-84dc-63b6721aef3d/female2.png?v=1701801337377",
        "https://cdn.glitch.global/12634f73-487e-48d6-84dc-63b6721aef3d/female1.png?v=1701801287808"
    ];
    // Set avatar based on gender
   var avatarImg = document.getElementById("profileAvatar");
    if (player.gender === "male") {
        // Select a random male avatar
        var randomMaleAvatar = maleAvatars[Math.floor(Math.random() * maleAvatars.length)];
        avatarImg.src = randomMaleAvatar;
    } else if (player.gender === "female") {
        // Select a random female avatar
        var randomFemaleAvatar = femaleAvatars[Math.floor(Math.random() * femaleAvatars.length)];
        avatarImg.src = randomFemaleAvatar;
    }
 
  //generates random birth time
  player.birthTime = getRandomTime();
  player.gender = document.querySelector('input[name="gender"]:checked').value;
  player.birthday = getRandomBirthday(2000, 2010); // Adjust years as needed

  // Update the welcome message
  document.getElementById("menu").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  document.getElementById(
    "output-container"
  ).innerText = `Welcome, ${player.name}! You were born at ${player.birthTime}, on ${player.birthday}. Your life begins...`;

  // Update the player info box
  document.getElementById("playerNameDisplay").textContent = player.name;
  document.getElementById("playerAgeDisplay").textContent = player.age;
  document.getElementById("playerOccupationDisplay").textContent =
    player.occupation();

  player.yearlyEvents = [
    "was born at " + player.birthTime + " on " + player.birthday,
  ];
  // Fetch and display initial messages
  // fetchAndDisplayMessages();
}

// Function to generate a random birthday
function getRandomBirthday(startYear, endYear) {
  var birthDate = new Date(
    startYear + Math.random() * (endYear - startYear),
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28) + 1
  );
  return birthDate.toDateString();
}

function getRandomTime() {
  var hours = Math.floor(Math.random() * 24);
  var minutes = Math.floor(Math.random() * 60);
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes + " " + ampm;
}

function ageOneYear() {
  if (player.age >= 70) {
    // Probability of surviving decreases with age
    var survivalChance = 1 - (player.age - 70) * 0.03; // Adjust the 0.03 factor as needed
    // Check if the player survives this year
    if (Math.random() > survivalChance || player.age >= 101) {
      player.yearlyEvents.push(
        "the grim reaper came knocking at their door (give them a comedic or absurd death, make it no longer than 30 words.)"
      );
    }
  }

  player.age++;
  // Update the player's occupation
  var newOccupation = player.occupation();

  //Update the player info box
  document.getElementById("playerAgeDisplay").textContent = player.age;
  document.getElementById("playerOccupationDisplay").textContent =
    newOccupation;

  // Create a new paragraph element for the age and format it as bold
  const ageParagraph = document.createElement("p");
  const boldAge = document.createElement("b");
  boldAge.textContent = `Age: ${player.age}`;
  ageParagraph.appendChild(boldAge);

  // Append the age paragraph to the output container
  const outputContainer = document.getElementById("output-container");
  outputContainer.appendChild(ageParagraph);

  // Scroll to the bottom of the output container
  outputContainer.scrollTop = outputContainer.scrollHeight;

  // Trigger events at specific ages
  if (player.age === 6) {
    document.getElementById("output-container").innerText +=
      "\nYou start elementary school!";
    player.yearlyEvents.push("started elementary school");
  } else if (player.age === 11) {
    document.getElementById("output-container").innerText +=
      "\nYou graduate elementary school and start middle school!";
    player.yearlyEvents.push(
      "graduated elementary school and started middle school"
    );
  } else if (player.age === 14) {
    document.getElementById("output-container").innerText +=
      "\nYou graduate Middle School and started High School!";
    player.yearlyEvents.push(
      "You graduated middle school and started High School"
    );
  } else if (player.age === 18) {
    document.getElementById("output-container").innerText +=
      "\nYou graduate High School!";
    // Show a popup for college decision
    var decision = confirm("Do you want to go to college?");
    if (decision) {
      document.getElementById("output-container").innerText +=
        "\nYou go to college!";
      player.yearlyEvents.push(
        "graduated high school and started college at university/college/trade school name"
      );
      player.education = "some college";
      player.occupation = () => {
        return "college student";
      };
    } else {
      document.getElementById("output-container").innerText +=
        "\nYou choose not to go to college.";
      player.yearlyEvents.push(
        "graduated high school and decided not to go to college"
      );
      player.education = "high school";
      player.occupation = () => {
        return OCCUPATIONS.noCollege[Math.floor(Math.random() * 6)];
      };
    }
  } else if (player.education == "some college" && player.age == 22) {
    let randJob = OCCUPATIONS.college[Math.floor(Math.random() * 6)];
    document.getElementById("output-container").innerText +=
      "\nYou graduated college!";
    player.yearlyEvents.push(
      "graduated college and got a job as a " +
        randJob +
        " (unless job is unemployed)!"
    );
    player.education = "college";
    player.occupation = () => {
      return randJob;
    };
  } else if (player.age == 65) {
    document.getElementById("output-container").innerText +=
      "\nYou retired from being a " + player.occupation() + "!";
    player.yearlyEvents.push("retired from being a " + player.occupation());

    player.occupation = () => {
      return "retired";
    };
  }


  document.getElementById("output-container").scrollTop =
    document.getElementById("output-container").scrollHeight;

  // Fetch and display messages after aging
  document.getElementById("ageUp").setAttribute("disabled", "");
  if (Math.random() < 0.50) {
    // 50% chance of a random event
    randEventPopup();
  } else {
      // fetchAndDisplayMessages();
    fetchAndDisplayGPTResponse(player.toString())
  }
}

async function fetchAndDisplayGPTResponse(gptRequest) {
  // Display the loader
  document.getElementById("loader-spinner").style.display = "block";

  try {
    console.log(gptRequest);
    const response = await fetch("/api", {
      method: "POST",
      body: JSON.stringify({ message: gptRequest })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    data.response.forEach((message) => {
      displayGPTResponse(GPTProcessor(message.content));
    });
    console.log(data);

  } catch (error) {
    console.error("Error fetching GPT response:", error);
  } finally {
    // Hide the loader regardless of the result
    document.getElementById("loader-spinner").style.display = "none";
    document.getElementById("ageUp").removeAttribute("disabled");
  }
}

//processes responses from GPT
function GPTProcessor(input) {
  let output = input;
  
  let listStart = input.indexOf("📋");
  if (listStart > -1) {
    let listEnd = input.indexOf("]", listStart);
    let listJson = input.slice(listStart + 2, listEnd + 1); // Extract only the list part
    player.assets = JSON.parse(listJson); // Parse the list as JSON

    output = input.slice(0, listStart) + input.slice(listEnd + 1); // Compose output string
    console.log(player.assets);
  }
  
  if (input.includes("☠")) {
    output = output.replace("☠", "");
    death(output);
  }

  return output;
}

//random event. Comes up with random event based on life stage and adds it to yearly events
function randEvent() {
  let randNum = Math.floor(Math.random() * 6);
  let event = randEvents[player.stage()][randNum];
  console.log(event);
  /* Random Events Explained: 
      The event variable randomly selects an event from a list of age appropriate events
      based on the player's stage of life.
      An event has three attributes: message, a, and b.
      Message is the message shown to the user.
      A and B are choices the user can make.
      A and B have their own attributes: display and GPT.
      Display is what is shown to the user.
      GPT is how the event is explained to the API. The GPT attribute of the selected option is
      pushed to the player.yearlyEvents array to let the system know what choices they've made.
      
      Example:
      Bobby is a 2 year old who has a random event.
      The random number for the event is 1, so the associated event is randEvents[youngChild][1].
      The event message is "Cindy at daycare took your cookie. What do you do?"
      a:[display: "Bite Her", GPT:"bit Cindy for stealing his cookie at daycare"]
      b:[display: "Cry Loudly", GPT:"cried because Cindy stole his cookie at daycare causing 
      his teacher to give him two and put Cindy in time out "]
      
      The user sees "Cindy at daycare took your cookie. What do you do?" 
      with the buttons "Bite Her" and "Cry Loudly." The GPT API only gets the value from the GPT 
      attribute of the chosen option.*/

  //display event
  // show modal with text = event.message and buttons for event.a.display and event.b.display with values equal
  //to event.a.GPT and event.b.GPT

  //once option is chosen
  //let choice = option.value
  //player.yearlyEvents.push(choice)

  /*optionally, some events have associated actions. Note: "choice" is not yet defined and should be bassed
    on the user's choice.
      To call the action, call
      if (event.choice.action) {
        event.choice.action();
      }
      }
    */
  return event;
}

function randEventPopup() {
  let event = randEvent();

  const modal = document.getElementById("myModal");
  const eventMessage = document.getElementById("event-message");
  const eventOptions = document.getElementById("event-options");
  const eventConfirm = document.getElementById("event-confirm");

  // Enable the button each time the modal is opened
  eventConfirm.disabled = false;

  eventMessage.textContent = event.message;
  eventOptions.innerHTML = `<option value="a">${event.a.display}</option><option value="b">${event.b.display}</option>`;
  modal.style.display = "block";

  eventConfirm.onclick = async function () {
    // Disable the button after it is clicked
    eventConfirm.disabled = true;

    const choice = eventOptions.value;
    const gptRequest = event[choice].GPT;

    // Clear the yearlyEvents array
    // player.yearlyEvents += [];
    player.yearlyEvents.push(gptRequest);

    // Perform any additional action associated with the choice
    if (event[choice].hasOwnProperty("action")) {
      event[choice].action();
    }

    // Send the GPT request to the API and process the response
    await fetchAndDisplayGPTResponse(player.toString());

    modal.style.display = "none";
  };
}


// Function to send GPT request and display response
async function fetchAndDisplayGPTResponse(gptRequest) {
  try {
    console.log(gptRequest);
    const response = await fetch("/api", {
      method: "POST",
      body: JSON.stringify({ message: gptRequest })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    data.response.forEach((message) => {
         displayGPTResponse(GPTProcessor(message.content));
    });
    console.log(data);
    document.getElementById("ageUp").removeAttribute("disabled");
  } catch (error) {
    console.error("Error fetching GPT response:", error);
  }
}

// Function to display GPT response
function displayGPTResponse(response) {
  const outputContainer = document.getElementById("output-container");
  const messageElement = document.createElement("div");
  messageElement.textContent = response;
  outputContainer.appendChild(messageElement);
  outputContainer.scrollTop = outputContainer.scrollHeight;
}

// Function to show the death popup
function showDeathPopup(age, message) {
  document.getElementById("death-age").textContent = age;
  document.getElementById("death-popup").style.display = "block";
  document.getElementById("gpt-death-message").textContent = message;
}


// Call the showDeathPopup function in your death() function
function death(message) {
  document.getElementById(
    "output-container"
  ).innerText += `\nYou passed away at the age of ${player.age}. Game over.`;
  showDeathPopup(player.age, message);
  document.getElementById("ageUp").setAttribute("hidden", "");
  return;
}

document.getElementById("restart").addEventListener("click", (e) => {
  location.reload();
})


