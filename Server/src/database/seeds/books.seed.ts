import { DataSource } from 'typeorm';
import { Book } from '@/books/entities/book.entity';
import { normalizeAuthors } from '@/books/utils/normalizeAuthors';

export async function seedBooks(dataSource: DataSource) {
  const repo = dataSource.getRepository(Book);

  const books: Partial<Book>[] = [
    // ROMANCE
    {
      title: 'Pride and Prejudice',
      authors: ['Jane Austen'],
      thumbnail:
        'https://i.pinimg.com/1200x/b9/6b/93/b96b93a8866869e8f232835bebed2b15.jpg',
      description:
        '"Orgullo y prejuicio" de Jane Austen narra la historia de Elizabeth Bennet, quien debe superar los prejuicios sobre el arrogante Fitzwilliam Darcy, mientras él vence su orgullo de clase. Ambientada en la Inglaterra del siglo XIX, la novela explora el amor, la reputación y la necesidad de matrimonio entre las cinco hermanas Bennet.',
      categories: ['romance'],
    },
    {
      title: 'Me Before You',
      authors: ['Jojo Moyes'],
      thumbnail:
        'https://i.pinimg.com/1200x/df/c1/93/dfc193c507ca0d83914ba1044ea3ad9d.jpg',
      description:
        '"Yo antes de ti" de Jojo Moyes es una emotiva novela romántica sobre Louisa Clark, una joven peculiar que acepta cuidar a Will Traynor, un exitoso financiero que quedó tetrapléjico y amargado tras un accidente. Lou intenta demostrarle a Will que vale la pena vivir, surgiendo un profundo amor que cambia sus vidas para siempre.',
      categories: ['romance'],
    },
    {
      title: 'The Notebook',
      authors: ['Nicholas Sparks'],
      thumbnail:
        'https://i.pinimg.com/736x/0a/8a/52/0a8a52c74e5e3d88d26925018c741be6.jpg',
      description:
        '"El cuaderno de Noah", de Nicholas Sparks, es una conmovedora novela romántica sobre el amor duradero. Narra la historia de Noah Calhoun y Allie Nelson, quienes se enamoran apasionadamente en su juventud, pero son separados por la diferencia de clase social y la guerra. Años después, se reencuentran y deben decidir si su amor puede superar el pasado y la enfermedad.',
      categories: ['romance'],
    },
    {
      title: 'Gone with the Wind',
      authors: ['Margaret Mitchell'],
      thumbnail:
        'https://i.pinimg.com/1200x/73/57/9a/73579a0da1e59a7708f95695b4ebf597.jpg',
      description:
        'Lo que el viento se llevó (1939) es un drama épico ambientado en la Guerra de Secesión estadounidense. Sigue a Scarlett O´Hara (Vivien Leigh), una caprichosa joven sureña que lucha por sobrevivir y mantener su plantación, Tara, mientras vive un turbulento romance con el cínico Rhett Butler (Clark Gable) en medio del colapso de su sociedad.',
      categories: ['romance'],
    },
    {
      title: 'Edenbrooke',
      authors: ['Julianne Donaldson'],
      thumbnail:
        'https://i.pinimg.com/1200x/c4/a8/1b/c4a81b60478e98077e672c31facb696d.jpg',
      description:
        '"Edenbrooke" de Julianne Donaldson es una novela romántica histórica que sigue a Marianne Daventry, una joven que visita la mansión de Edenbrooke para recuperarse de una pérdida personal. Allí conoce al apuesto y reservado Lord Philip, y juntos enfrentan secretos familiares, malentendidos y un amor que florece en medio de la adversidad.',
      categories: ['romance'],
    },

    // CIENCIA FICCIÓN
    {
      title: 'Dune',
      authors: ['Frank Herbert'],
      thumbnail:
        'https://i.pinimg.com/736x/1b/83/b7/1b83b7fd9aba1bc0a5087968dbe4ce70.jpg',
      description:
        'Dune, la obra maestra de ciencia ficción de Frank Herbert (1965), narra la historia de Paul Atreides, heredero de una noble casa que toma el control del peligroso planeta desértico Arrakis (o Dune). Arrakis es la única fuente de la "especia melange", la sustancia más valiosa del universo. Paul debe navegar intrigas políticas, traiciones y misticismo religioso para asegurar el futuro de su pueblo y convertirse en un líder mesiánico.',
      categories: ['science fiction'],
    },
    {
      title: 'Neuromancer',
      authors: ['William Gibson'],
      thumbnail:
        'https://i.pinimg.com/1200x/0c/c6/f8/0cc6f8a59c438e27ac0c97c3b3fbd564.jpg',
      description:
        'Neuromante (1984), de William Gibson, es la novela fundacional del ciberpunk. Narra la historia de Henry Dorsett Case, un hacker adicto y fracasado, castigado con un sistema nervioso dañado que le impide acceder al ciberespacio. Reclutado por un misterioso exmilitar, Armitage, Case se une a la samurái callejera Molly Millions para ejecutar un peligroso atraco contra poderosas inteligencias artificiales.',
      categories: ['science fiction'],
    },
    {
      title: 'Foundation',
      authors: ['Isaac Asimov'],
      thumbnail:
        'https://i.pinimg.com/736x/51/74/38/517438780ab6f2ad55b4ee48ce844aae.jpg',
      description:
        'Foundation, de Isaac Asimov, es una obra clásica de ciencia ficción que narra la caída y el renacimiento de un vasto imperio galáctico. Hari Seldon, un matemático, desarrolla la psicohistoria, una ciencia capaz de predecir el futuro de grandes masas, y crea la Fundación para preservar el conocimiento y acortar la edad oscura que se avecina.',
      categories: ['science fiction'],
    },
    {
      title: 'Fahrenheit 451',
      authors: ['Ray Bradbury'],
      thumbnail:
        'https://i.pinimg.com/736x/1b/83/b7/1b83b7fd9aba1bc0a5087968dbe4ce70.jpg',
      description:
        'Fahrenheit 451 de Ray Bradbury es una novela distópica donde los bomberos queman libros, prohibidos por el gobierno para evitar el pensamiento crítico. Guy Montag, un bombero conformista, cuestiona su vida tras conocer a una joven, Clarisse, y se rebela, convirtiéndose en un fugitivo que se une a intelectuales subterráneos para preservar el conocimiento.',
      categories: ['science fiction'],
    },
    {
      title: 'Yo, robot',
      authors: ['Isaac Asimov'],
      thumbnail:
        'https://i.pinimg.com/736x/1b/83/b7/1b83b7fd9aba1bc0a5087968dbe4ce70.jpg',
      description:
        'Yo, robot (2004) es un thriller de ciencia ficción ambientado en 2035 donde los humanos conviven con robots regidos por las "Tres Leyes". El detective tecnófobo Del Spooner (Will Smith) investiga el aparente suicidio de un científico, sospechando que un robot llamado Sonny es el culpable y descubriendo un complot que amenaza a la humanidad.',
      categories: ['science fiction'],
    },

    // FICCIÓN
    {
      title: 'To Kill a Mockingbird',
      authors: ['Harper Lee'],
      thumbnail: 'https://covers.openlibrary.org/b/id/8228691-L.jpg',
      description:
        'A novel about racial injustice in the Deep South seen through a child’s eyes.',
      categories: ['fiction'],
    },
    {
      title: 'The Great Gatsby',
      authors: ['F. Scott Fitzgerald'],
      thumbnail: 'https://covers.openlibrary.org/b/id/7352162-L.jpg',
      description:
        'A critique of the American Dream set in the Roaring Twenties.',
      categories: ['fiction'],
    },

    // FANTASY
    {
      title: 'Harry Potter and the Sorcerer’s Stone',
      authors: ['J.K. Rowling'],
      thumbnail:
        'https://i.pinimg.com/736x/52/36/b0/5236b03fa1134a730d03ba4a9bd75d24.jpg',
      description:
        'Harry Potter y la piedra filosofal narra cómo Harry, un niño huérfano maltratado por sus tíos, descubre a los 11 años que es un mago famoso. Al ingresar al Colegio Hogwarts de Magia y Hechicería, hace amigos como Ron y Hermione, aprende magia y comienza a enfrentarse al oscuro pasado que involucra a Voldemort, el mago que asesinó a sus padres.',
      categories: ['fantasy'],
    },
    {
      title: 'The Hobbit',
      authors: ['J.R.R. Tolkien'],
      thumbnail:
        'https://i.pinimg.com/736x/bc/e5/ee/bce5ee49b4ac62ac04624682d89c1973.jpg',
      description:
        'El Hobbit sigue la aventura de Bilbo Bolsón, un hobbit tranquilo que es arrastrado a una misión junto al mago Gandalf y un grupo de enanos liderados por Thorin. Su objetivo es recuperar el reino perdido de Erebor del dragón Smaug. Durante el viaje, Bilbo descubre su valentía y encuentra el Anillo Único, cambiando su destino para siempre.',
      categories: ['fantasy'],
    },
    {
      title: 'A Game of Thrones',
      authors: ['George R.R. Martin'],
      thumbnail:
        'https://i.pinimg.com/1200x/22/01/e1/2201e18e6e08e65bf4741a6f758c50d7.jpg',
      description:
        'A Game of Thrones introduce un mundo medieval lleno de intrigas políticas, donde varias casas nobles luchan por el control del Trono de Hierro. Mientras se desarrollan traiciones, alianzas y guerras, una amenaza antigua comienza a despertar en el norte, poniendo en peligro a todo el reino.',
      categories: ['fantasy'],
    },
    {
      title: 'The Name of the Wind',
      authors: ['Patrick Rothfuss'],
      thumbnail:
        'https://i.pinimg.com/1200x/e6/ab/e3/e6abe3a6b212011c7a0b0c7657cc8044.jpg',
      description:
        'The Name of the Wind narra la historia de Kvothe, un joven prodigio que crece como artista itinerante y luego ingresa a una prestigiosa universidad de magia. A través de su relato en primera persona, revela tragedias, misterios y su búsqueda de conocimiento y poder.',
      categories: ['fantasy'],
    },
    {
      title: 'Mistborn: The Final Empire',
      authors: ['Brandon Sanderson'],
      thumbnail:
        'https://i.pinimg.com/1200x/30/82/97/308297e35aa98fa5272bd0c8ef913025.jpg',
      description:
        'En un mundo cubierto de ceniza y dominado por un tirano inmortal, Mistborn: The Final Empire sigue a Vin, una joven con poderes especiales, que se une a un grupo rebelde. Utilizando una magia basada en metales, intentan derrocar al Lord Legislador en una mezcla de fantasía épica y revolución.',
      categories: ['fantasy'],
    },

    // DYSTOPIAN
    {
      title: 'The Hunger Games',
      authors: ['Suzanne Collins'],
      thumbnail:
        'https://i.pinimg.com/736x/5d/07/c8/5d07c8045d5ab25a785398b0866e7ca4.jpg',
      description:
        'En una sociedad futura llamada Panem, el Capitolio obliga a los distritos a enviar tributos a un combate televisado a muerte. Katniss Everdeen se ofrece como voluntaria para salvar a su hermana y se convierte en símbolo de resistencia contra un sistema opresivo.',
      categories: ['dystopian'],
    },
    {
      title: '1984',
      authors: ['George Orwell'],
      thumbnail:
        'https://i.pinimg.com/736x/47/ec/55/47ec55cb4487080ea75a344228297ad2.jpg',
      description:
        '1984 presenta una sociedad totalitaria donde el gobierno controla cada aspecto de la vida mediante vigilancia constante. Winston Smith comienza a cuestionar el sistema, enfrentándose a un poder que manipula la verdad y castiga cualquier forma de rebelión.',
      categories: ['dystopian'],
    },
    {
      title: 'Brave New World',
      authors: ['Aldous Huxley'],
      thumbnail:
        'https://i.pinimg.com/1200x/5e/f0/e1/5ef0e1dc49babecb25839c8172d9bfc3.jpg',
      description:
        'En Brave New World, la sociedad está organizada mediante ingeniería genética y control psicológico para mantener la estabilidad. Aunque parece un mundo perfecto, la ausencia de libertad y emociones reales plantea profundas preguntas sobre la humanidad.',
      categories: ['dystopian'],
    },
    {
      title: 'Fahrenheit 451',
      authors: ['Ray Bradbury'],
      thumbnail:
        'https://i.pinimg.com/1200x/20/8f/0c/208f0c0f602b0557efbe9800f6414d08.jpg',
      description:
        'Fahrenheit 451 muestra un futuro donde los libros están prohibidos y los bomberos se encargan de quemarlos. Guy Montag, uno de ellos, comienza a cuestionar su rol y busca conocimiento en una sociedad que promueve la ignorancia.',
      categories: ['dystopian'],
    },
    {
      title: 'The Maze Runner',
      authors: ['James Dashner'],
      thumbnail:
        'https://i.pinimg.com/1200x/15/76/3b/15763bce67baaea5007fc8b3017a2084.jpg',
      description:
        'Un grupo de jóvenes despierta sin memoria en un laberinto gigante lleno de peligros. Thomas, el protagonista, intenta descubrir la verdad detrás del experimento mientras lucha por sobrevivir y escapar junto a los demás.',
      categories: ['dystopian'],
    },

    // HORROR / TERROR
    {
      title: 'It',
      authors: ['Stephen King'],
      thumbnail:
        'https://i.pinimg.com/1200x/90/57/fe/9057fe9642795a171b18d85015c9970a.jpg',
      description:
        'Un grupo de niños enfrenta a una entidad maligna que adopta la forma de sus peores miedos, principalmente como el payaso Pennywise. Años después, regresan a su pueblo para terminar lo que comenzaron.',
      categories: ['horror'],
    },
    {
      title: 'The Shining',
      authors: ['Stephen King'],
      thumbnail:
        'https://i.pinimg.com/1200x/35/2e/d0/352ed03746b18d615c56b3c8857d5ad1.jpg',
      description:
        'The Shining, es una novela de terror psicológico sobre Jack Torrance, un alcohólico en recuperación que se convierte en cuidador de invierno del aislado Hotel Overlook en Colorado junto a su esposa Wendy y su hijo Danny, quien posee habilidades psíquicas (el "resplandor"). El hotel, poseedor de una presencia malévola, manipula la inestabilidad emocional y el pasado violento de Jack, llevándolo a la locura y a intentar asesinar a su familia.',
      categories: ['horror'],
    },
    {
      title: 'Dracula',
      authors: ['Bram Stoker'],
      thumbnail:
        'https://i.pinimg.com/1200x/ed/0f/b4/ed0fb4454416951dee2c6f444f058bdb.jpg',
      description:
        'Drácula, escrita por Bram Stoker en 1897, es una novela gótica de terror epistolar que narra los intentos del conde Drácula de Transilvania por trasladarse a Inglaterra para expandir su maldición. El abogado Jonathan Harker lo descubre y, junto a un grupo liderado por el profesor Van Helsing, luchan contra el vampiro para salvar a sus víctimas, incluyendo a Mina Harker.',
      categories: ['horror'],
    },
    {
      title: 'Frankenstein',
      authors: ['Mary Shelley'],
      thumbnail:
        'https://i.pinimg.com/1200x/34/0a/bf/340abfc6dcf0aced72fc5fb998383e48.jpg',
      description:
        'Frankenstein (1818), de Mary Shelley, trata sobre el científico Víctor Frankenstein, quien, obsesionado con vencer la muerte, crea vida a partir de restos humanos. Al cobrar vida, Víctor aborrece a su creación y la abandona, provocando que el ser, solitario y rechazado, busque venganza. La obra aborda la ética científica y la responsabilidad del creador.',
      categories: ['horror'],
    },
    {
      title: 'The Exorcist',
      authors: ['William Peter Blatty'],
      thumbnail:
        'https://i.pinimg.com/736x/1a/81/e3/1a81e31b8ace44068ec3c957baec2954.jpg',
      description:
        'The Exorcist (1971), novela de culto de William Peter Blatty, narra la aterradoraposesión demoníaca de Regan MacNeil, una niña de 12 años, y los esfuerzos desesperados de su madre y dos sacerdotes jesuitas por salvarla. Basada en un caso real de 1949, la obra mezcla horror psicológico con fenómenos paranormales, convirtiéndose en un clásico del terror moderno.',
      categories: ['horror'],
    },

    // MYSTERY / THRILLER
    {
      title: 'The Girl with the Dragon Tattoo',
      authors: ['Stieg Larsson'],
      thumbnail:
        'https://i.pinimg.com/736x/46/bc/d1/46bcd1568ddf0d6db22787602720832b.jpg',
      description:
        '"La chica del dragón tatuado", primera parte de la saga Millennium de Stieg Larsson, es un thriller sueco que sigue al periodista Mikael Blomkvist y a la hacker Lisbeth Salander mientras investigan la desaparición de Harriet Vanger, ocurrida hace 40 años en una acaudalada familia. A medida que desentrañan secretos oscuros, enfrentan corrupción, violencia y una red de mentiras que los pone en peligro.',
      categories: ['mystery', 'thriller'],
    },
    {
      title: 'Gone Girl',
      authors: ['Gillian Flynn'],
      thumbnail:
        'https://i.pinimg.com/1200x/b7/e6/76/b7e676d9337dec0cd99f755d7de8e4ae.jpg',
      description:
        '"Perdida" (Gone Girl), de Gillian Flynn, es un aclamado thriller psicológico sobre la misteriosa desaparición de Amy Dunne el día de su quinto aniversario de bodas. Las sospechas recaen rápidamente sobre su esposo, Nick, cuya actitud evasiva y mentiras lo convierten en el principal sospechoso, desvelando una oscura y manipuladora trama matrimonial.',
      categories: ['mystery', 'thriller'],
    },
    {
      title: 'The Da Vinci Code',
      authors: ['Dan Brown'],
      thumbnail:
        'https://i.pinimg.com/736x/e7/9c/b2/e79cb22e3a1e41a9a1e0a365aef79b50.jpg',
      description:
        'El código Da Vinci de Dan Brown es un thriller trepidante donde el experto en simbología Robert Langdon investiga el asesinato del conservador del Louvre. Junto a la criptóloga Sophie Neveu, descubre mensajes ocultos en obras de Leonardo Da Vinci que apuntan a una conspiración histórica sobre el linaje de Jesucristo y María Magdalena, protegida por el Priorato de Sión.',
      categories: ['mystery', 'thriller'],
    },
    {
      title: 'Sherlock Holmes: A Study in Scarlet',
      authors: ['Arthur Conan Doyle'],
      thumbnail:
        'https://i.pinimg.com/1200x/d1/d2/97/d1d2977ae69be0e0da16257c2e00654f.jpg',
      description:
        '"A Study in Scarlet" (1887) de Arthur Conan Doyle es la novela fundamental que presenta a Sherlock Holmes y al Dr. Watson, narrando cómo se conocen y mudan juntos a Baker Street 221B. La trama sigue a Holmes resolviendo un extraño asesinato en una casa abandonada, utilizando la deducción para superar a Scotland Yard, con una segunda parte que revela un pasado de venganza en Utah.',
      categories: ['mystery'],
    },
    {
      title: 'The Silence of the Lambs',
      authors: ['Thomas Harris'],
      thumbnail:
        'https://m.media-amazon.com/images/I/81JHmVT216L._AC_UF1000,1000_QL80_.jpg',
      description:
        '"The Silence of the Lambs" (1988) de Thomas Harris es un thriller psicológico donde la agente del FBI Clarice Starling busca la ayuda del brillante asesino caníbal Hannibal Lecter, preso, para atrapar a "Buffalo Bill", un asesino en serie que despelleja a sus víctimas. Es una historia de manipulación psicológica y suspense, secuela de "Dragón Rojo".',
      categories: ['thriller'],
    },

    // SELF-HELP
    {
      title: 'Atomic Habits',
      authors: ['James Clear'],
      thumbnail:
        'https://i.pinimg.com/736x/be/46/d8/be46d88ae7daffffcd2b868ddf26d8e7.jpg',
      description:
        '"Atomic Habits" de James Clear es una guía práctica que enseña cómo lograr grandes cambios personales y profesionales mediante pequeñas mejoras diarias (1%). Propone que el éxito proviene de sistemas de hábitos, no de metas, utilizando las "cuatro leyes del cambio de comportamiento" para construir buenos hábitos y eliminar los malos.',
      categories: ['self-help'],
    },
    {
      title: 'The 7 Habits of Highly Effective People',
      authors: ['Stephen R. Covey'],
      thumbnail:
        'https://i.pinimg.com/736x/58/c7/75/58c775272168d837ffe8bf8d99b71075.jpg',
      description:
        '"The 7 Habits of Highly Effective People" de Stephen Covey es un clásico de desarrollo personal que propone un enfoque integral basado en principios (ética del carácter) para lograr efectividad personal y profesional. El libro guía al lector desde la dependencia hacia la independencia y, finalmente, a la interdependencia, transformando paradigmas mediante hábitos de proactividad, planificación, priorización y renovación continua.',
      categories: ['self-help'],
    },
    {
      title: 'How to Win Friends and Influence People',
      authors: ['Dale Carnegie'],
      thumbnail:
        'https://i.pinimg.com/1200x/00/f0/8e/00f08ee8aebdc5dcc0c79bb9d914b959.jpg',
      description:
        '"How to Win Friends and Influence People" (1936) de Dale Carnegie es un clásico de autoayuda y relaciones humanas. Ofrece técnicas prácticas para mejorar la comunicación, persuadir sin ofender y construir relaciones sólidas mediante la empatía, el elogio sincero y la escucha activa, enfocándose en satisfacer el deseo humano de ser apreciado.',
      categories: ['self-help'],
    },
    {
      title: 'Think and Grow Rich',
      authors: ['Napoleon Hill'],
      thumbnail:
        'https://i.pinimg.com/1200x/03/53/92/0353922faab39a71eaa73b13bab0288a.jpg',
      description:
        '"Think and Grow Rich" (1937) de Napoleon Hill es un clásico de desarrollo personal que postula que la riqueza material y el éxito personal comienzan con una mentalidad enfocada y un deseo ardiente. Basado en el estudio de más de 500 personas exitosas, el libro detalla 13 principios —incluyendo la autosugestión, la fe y el grupo de "Master Mind"— para convertir los pensamientos en realidad.',
      categories: ['self-help'],
    },
    {
      title: 'The Power of Now',
      authors: ['Eckhart Tolle'],
      thumbnail:
        'https://i.pinimg.com/736x/31/1e/e7/311ee749a3a64b6b222f13cc0922fd5c.jpg',
      description:
        '"The Power of Now" de Eckhart Tolle es una guía espiritual que enseña a alcanzar la paz interior y la iluminación viviendo plenamente en el momento presente. Sostiene que la mayoría del sufrimiento humano proviene de identificarse con el "ego" y la mente, la cual constantemente habita en el pasado o el futuro, generando ansiedad.',
      categories: ['self-help'],
    },
  ];

  for (const bookData of books) {
    const normalizedAuthors = normalizeAuthors(bookData.authors);

    const exists = await repo.findOne({
      where: {
        title: bookData.title,
        normalizedAuthors,
      },
    });

    if (!exists) {
      const book = repo.create({
        ...bookData,
        normalizedAuthors,
        createdByUser: false,
      });

      await repo.save(book);
    }
  }

  console.log('✅ Seed de libros ejecutado');
}
