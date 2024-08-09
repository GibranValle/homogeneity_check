export const GLOSSARY = [
	{
		title: '1. ROI (Región de Interés)',
		description:
			'La Región de Interés (ROI) es una parte específica de una imagen médica que se selecciona para su análisis detallado. En la radiología, el ROI se utiliza para evaluar características específicas como la densidad, el contraste y la homogeneidad de los tejidos. El análisis de la ROI es crucial para diagnosticar y planificar el tratamiento de patologías, ya que permite una observación más precisa de la zona de interés sin la interferencia de otras partes de la imagen.',
	},

	{
		title: '2. VMP (Valor Medio del Píxel)',
		description:
			'El Valor Medio del Píxel (VMP) se refiere al promedio de los valores de píxeles dentro de un ROI. En una imagen digital, cada píxel tiene un valor que representa la intensidad o el brillo en una escala de grises o de colores. El VMP es una medida estadística utilizada para evaluar la calidad de la imagen y puede ser indicativa de la dosis de radiación recibida, la calidad del contraste y la uniformidad de la imagen.',
	},

	{
		title: '3. Desviación',
		description:
			'La desviación, en el contexto de la imagen médica, se refiere a la medida de dispersión o variabilidad de los valores de los píxeles dentro de un ROI. Una baja desviación indica que los valores de los píxeles son relativamente homogéneos, mientras que una alta desviación sugiere variabilidad en la intensidad de los píxeles, lo cual puede ser un indicativo de ruido o de variaciones en la calidad de la imagen.',
	},

	{
		title: '4. Homogeneidad',
		description:
			'La homogeneidad se refiere a la uniformidad de los valores de los píxeles dentro de una imagen o un ROI. En imágenes médicas, una imagen homogénea tiene valores de píxeles consistentes y uniformes, lo que es deseable para una interpretación precisa. La falta de homogeneidad puede ser causada por factores como el ruido, artefactos, o variaciones en la adquisición de la imagen, lo cual puede afectar la precisión diagnóstica.',
	},

	{
		title: '5. Efecto Talón',
		description:
			'El efecto talón es un fenómeno que ocurre en los tubos de rayos X debido a la geometría del ánodo. Se caracteriza por una disminución en la intensidad de los rayos X a lo largo del campo de radiación desde el ánodo hacia el cátodo. Este efecto provoca una variación en la densidad de la imagen, afectando la homogeneidad de la radiación en la imagen radiográfica. Es importante tener en cuenta este efecto al posicionar al paciente y ajustar los parámetros de la radiografía para minimizar su impacto.',
	},

	{
		title: '6. Detector de Campo Plano',
		description:
			'Un detector de campo plano es un tipo de detector de imágenes que utiliza una matriz de píxeles dispuestos en un plano para captar la radiación que atraviesa el cuerpo del paciente. Estos detectores son ampliamente utilizados en sistemas de radiología digital, ya que ofrecen alta resolución espacial y capacidad para producir imágenes en tiempo real. Los detectores de campo plano han reemplazado a los sistemas de imagen basados en películas y ofrecen ventajas como una mejor calidad de imagen y menor exposición a la radiación.',
	},

	{
		title: '7. Función de Respuesta kV y mAs',
		description:
			'La función de respuesta kV (kilovoltios) y mAs (miliamperios-segundos) describe cómo un detector de imágenes responde a variaciones en los parámetros de exposición de la radiografía. El kV controla la energía de los rayos X, afectando el contraste y la penetración de la imagen, mientras que el mAs controla la cantidad de radiación producida, afectando la densidad de la imagen. La función de respuesta es fundamental para ajustar los parámetros de exposición y asegurar que las imágenes sean de alta calidad y clínicamente útiles, minimizando al mismo tiempo la dosis de radiación al paciente.',
	},
]

export const IMPORTANCE = [
	{
		title: 'Importancia de la Medición de la Homogeneidad del Detector en Mastografía en el Contexto de la Normativa Mexicana',
		description:
			'En México, la medición de la homogeneidad del detector en mastografía no solo es crucial por razones clínicas y técnicas, sino también por el cumplimiento de normativas específicas que regulan la calidad y seguridad en los procedimientos de imagenología. A continuación, se describe la importancia de esta medición en el contexto de la normativa mexicana:',
	},

	{
		title: '1. Cumplimiento con la Norma Oficial Mexicana (NOM)',
		description:
			'La Norma Oficial Mexicana NOM-229-SSA1-2002, que regula la instalación y operación de equipos de rayos X para diagnóstico médico y la protección de salud ocupacional, establece criterios específicos para asegurar la calidad de las imágenes y la seguridad radiológica. Según esta norma, los equipos de mastografía deben someterse a pruebas periódicas de control de calidad, que incluyen la evaluación de la homogeneidad del detector. Esta evaluación garantiza que el equipo cumple con los estándares mínimos requeridos, lo que es esencial para la autorización de su uso en establecimientos de salud.',
	},

	{
		title: '2. Calidad de Imagen y Diagnóstico Preciso',
		description:
			'La NOM-229-SSA1-2002 enfatiza la necesidad de obtener imágenes de alta calidad para un diagnóstico preciso, especialmente en estudios como la mastografía, que es fundamental para la detección temprana del cáncer de mama. La homogeneidad del detector es un componente esencial para lograr imágenes uniformes y evitar errores diagnósticos. Una imagen no homogénea podría dar lugar a falsos positivos o negativos, comprometiendo la detección de lesiones.',
	},

	{
		title: '3. Protección al Paciente y Optimización de la Dosis de Radiación',
		description:
			'La normativa mexicana también se preocupa por la protección radiológica del paciente. La NOM-229-SSA1-2002 requiere que se minimice la exposición a la radiación manteniendo una alta calidad de imagen. Un detector que no es homogéneo podría llevar a ajustes incorrectos de los parámetros de exposición (como kV y mAs), resultando en una dosis de radiación innecesariamente alta. Al garantizar la homogeneidad del detector, se asegura que el equipo de mastografía funcione de manera óptima, reduciendo la exposición del paciente sin comprometer la calidad de la imagen.',
	},

	{
		title: '4. Evaluaciones y Auditorías de Control de Calidad',
		description:
			'La norma establece que los equipos de rayos X, incluidos los de mastografía, deben someterse a evaluaciones periódicas y auditorías para verificar su desempeño. Estas evaluaciones incluyen pruebas de homogeneidad del detector como parte del programa de control de calidad. El cumplimiento de estas evaluaciones es obligatorio para la operación continua de los equipos, y las deficiencias en la homogeneidad pueden resultar en sanciones o en la suspensión del uso del equipo hasta que se realicen las correcciones necesarias.',
	},

	{
		title: '5. Responsabilidad Legal y Ética',
		description:
			'El cumplimiento con la NOM-229-SSA1-2002 no solo es una obligación legal, sino también una responsabilidad ética de los profesionales de la salud. La normativa garantiza que los pacientes reciban atención de calidad y se protejan de los riesgos asociados con la radiación. La medición de la homogeneidad del detector es parte de esta responsabilidad, asegurando que las imágenes producidas sean fiables y seguras para el diagnóstico.',
	},

	{
		title: '6. Estándares Internacionales y Competencia Global',
		description:
			'Aunque la normativa mexicana es específica, está alineada con estándares internacionales de calidad en imagenología, como los establecidos por la American College of Radiology (ACR) y la European Federation of Organisations for Medical Physics (EFOMP). El cumplimiento con la NOM-229-SSA1-2002 asegura que los centros de salud en México operen con estándares globales, lo cual es crucial en un entorno de salud cada vez más globalizado.',
	},

	{
		title: 'Conclusión',
		description:
			'La medición de la homogeneidad del detector en mastografía es esencial no solo por razones clínicas, sino también por el cumplimiento de la normativa mexicana. La NOM-229-SSA1-2002 regula estrictamente la calidad y seguridad de los procedimientos de rayos X, incluyendo la mastografía, y la homogeneidad del detector es un factor clave para garantizar imágenes de alta calidad, minimizar la dosis de radiación y cumplir con los requisitos legales. El control riguroso de la homogeneidad del detector asegura que los equipos de mastografía en México operen bajo estándares de calidad que protejan la salud del paciente y garanticen diagnósticos precisos.',
	},
]

export const METHODOLOGY = [
	{
		title: 'Metodología del Protocolo Español de Control Radiológico para Medir la Homogeneidad Usando una Imagen DICOM',
		description:
			'El protocolo español para el control radiológico establece una serie de procedimientos para evaluar la calidad de imagen en equipos de radiodiagnóstico, incluyendo la homogeneidad del detector. A continuación, se describe la metodología específica para medir la homogeneidad utilizando una imagen DICOM, que es el formato estándar para la gestión de imágenes médicas.',
		content: [],
	},
	{
		title: '1. Preparación del Equipo',
		description: '',
		content: [
			{
				subtitle: 'Calibración del Equipo',
				text: 'Antes de iniciar la medición de la homogeneidad, se debe asegurar que el equipo de imagen esté correctamente calibrado. Esto incluye la verificación del funcionamiento del tubo de rayos X y la comprobación de los parámetros de exposición.',
			},
			{
				subtitle: 'Configuración de los Parámetros',
				text: 'Se seleccionan los parámetros estándar de exposición para la prueba de homogeneidad, los cuales deben ser consistentes con los utilizados en la práctica clínica habitual. En general, se recomienda utilizar un voltaje (kV) y una corriente (mAs) que sean representativos de las condiciones de uso clínico del equipo.',
			},
		],
	},
	{
		title: '2. Adquisición de la Imagen de Prueba',
		description: '',
		content: [
			{
				subtitle: 'Selección del Phantom',
				text: 'Se utiliza un phantom (un objeto simulador que emula la densidad y características del tejido humano) homogéneo y adecuado para la evaluación de la homogeneidad del detector. El phantom debe ser de material radiopaco uniforme, como aluminio o PMMA (polimetilmetacrilato), que proporciona una respuesta uniforme en la imagen radiológica.',
			},
			{
				subtitle: 'Posicionamiento del Phantom',
				text: 'El phantom se coloca directamente sobre la superficie del detector, asegurándose de que cubra completamente el área activa del detector para evaluar toda su extensión.',
			},
			{
				subtitle: 'Captura de la Imagen',
				text: 'Se toma una imagen radiográfica del phantom en condiciones de exposición controladas. La imagen obtenida se guarda en formato DICOM para su análisis posterior.',
			},
		],
	},
	{
		title: '3. Análisis de la Imagen DICOM',
		description: '',
		content: [
			{
				subtitle: 'Carga de la Imagen',
				text: 'La imagen DICOM se carga en un software de análisis de imágenes médicas especializado que permita el análisis de parámetros específicos como la homogeneidad.',
			},
			{
				subtitle: 'Definición del ROI (Región de Interés)',
				text: 'Se selecciona una región de interés (ROI) que cubra una porción significativa del detector. Es recomendable elegir varias ROIs distribuidas uniformemente sobre la imagen para evaluar la homogeneidad en diferentes áreas del detector.',
			},
			{
				subtitle: 'Cálculo del Valor Medio del Píxel (VMP)',
				text: 'Para cada ROI seleccionada, se calcula el valor medio del píxel (VMP). Este valor representa la intensidad media de los píxeles dentro de la ROI y es un indicador de la respuesta del detector en esa área específica.',
			},
		],
	},
	{
		title: '4. Evaluación de la Homogeneidad',
		description: '',
		content: [
			{
				subtitle: 'Cálculo de la Desviación Estándar',
				text: 'Se calcula la desviación estándar de los valores de píxel dentro de cada ROI. Una baja desviación estándar sugiere una alta homogeneidad, mientras que una desviación alta indica variabilidad en la respuesta del detector.',
			},
			{
				subtitle: 'Comparación entre ROIs',
				text: 'Se comparan los valores medios de los píxeles (VMP) y las desviaciones estándar de las diferentes ROIs. La homogeneidad se evalúa observando la consistencia de estos valores en todas las áreas del detector.',
			},
			{
				subtitle: 'Criterios de Aceptación',
				text: 'Según el protocolo español, se establecen criterios específicos de aceptación para la homogeneidad del detector. Generalmente, se espera que la diferencia entre los valores medios de los píxeles de las diferentes ROIs no supere un porcentaje determinado (por ejemplo, ±5%) en relación con el valor medio global. Si las diferencias están dentro de los límites aceptables, se considera que la homogeneidad del detector es adecuada.',
			},
		],
	},
	{
		title: '5. Repetición y Validación',
		description: '',
		content: [
			{
				subtitle: 'Repetición Periódica',
				text: 'La prueba de homogeneidad debe realizarse periódicamente como parte del control de calidad del equipo de radiodiagnóstico. Esto garantiza que el equipo continúe funcionando dentro de los parámetros aceptables y que cualquier deterioro en la homogeneidad sea detectado y corregido a tiempo.',
			},
			{
				subtitle: 'Validación de Resultados',
				text: 'Los resultados de la prueba deben ser validados por un especialista en física médica o un ingeniero clínico, quienes pueden interpretar los datos y asegurar que los estándares de calidad se mantengan.',
			},
		],
	},
]

export const ROI = [
	{
		title: 'Definición del ROI (Región de Interés) para la Medición de Homogeneidad',
		description:
			'En el contexto de la medición de la homogeneidad del detector en imágenes médicas, la definición del ROI (Región de Interés) es un paso crítico que influye directamente en la precisión y fiabilidad del análisis. A continuación, se profundiza en los aspectos clave relacionados con el tamaño, la posición y los márgenes de las ROIs durante esta evaluación.',
		content: [],
	},
	{
		title: '1. Tamaño del ROI',
		description: '',
		content: [
			{
				subtitle: 'Dimensiones Estándar',
				text: 'Según el protocolo español, el tamaño del ROI recomendado suele ser de 2x2 cm. Esto corresponde aproximadamente a una matriz de 20x20 píxeles en imágenes con una resolución típica de 100 píxeles por centímetro, aunque este tamaño puede ajustarse dependiendo de la resolución específica de la imagen y del detector.',
			},
			{
				subtitle: 'Justificación',
				text: 'Este tamaño es suficiente para abarcar un número representativo de píxeles que permita una evaluación estadística fiable de la homogeneidad, evitando que las variaciones locales en el ruido afecten significativamente los resultados.',
			},
		],
	},
	{
		title: '2. Margen respecto a los bordes de la imagen',
		description: '',
		content: [
			{
				subtitle: 'Margen de Seguridad',
				text: ' El protocolo establece que los ROIs no deben colocarse demasiado cerca de los bordes del detector. Se recomienda dejar un margen mínimo del 10% de la dimensión total de la imagen desde los bordes antes de definir un ROI. Esto significa que si la imagen mide 24x30 cm (un tamaño típico en mamografía), los ROIs deben estar al menos a 2,4 cm de los bordes.',
			},
			{
				subtitle: 'Razón para el Margen',
				text: 'Este margen evita la inclusión de áreas donde puede haber artefactos o efectos de borde, como el efecto talón o gradientes de intensidad, que podrían sesgar los resultados de homogeneidad.',
			},
		],
	},
	{
		title: '3. Número de ROIs',
		description: '',
		content: [
			{
				subtitle: 'Distribución y Cantidad',
				text: 'El protocolo español sugiere que se utilicen al menos 5 ROIs para evaluar la homogeneidad del detector. Estos ROIs deben distribuirse de la siguiente manera',
			},
			{
				subtitle: 'Uno en el centro de la imagen',
				text: '',
			},
			{
				subtitle: 'Cuatro en las esquinas',
				text: 'situados a una distancia suficiente de los bordes para cumplir con el margen establecido.',
			},
			{
				subtitle: 'Opcionalmente',
				text: 'se pueden agregar ROIs adicionales si se requiere un análisis más detallado, especialmente en detectores de gran tamaño o en situaciones donde se sospecha que puede haber inhomogeneidades en áreas específicas.',
			},
		],
	},
	{
		title: 'Conclusión',
		description:
			'Estas directrices del protocolo español aseguran una evaluación robusta y estandarizada de la homogeneidad del detector, garantizando que se cubran las áreas más representativas y evitando la influencia de posibles artefactos periféricos. El cumplimiento de estas especificaciones es crucial para mantener la calidad de las imágenes médicas y la fiabilidad de los diagnósticos que se derivan de ellas.',
		content: [
			{
				subtitle: 'Tamaño del ROI',
				text: 'Aproximadamente 2x2 cm.',
			},
			{
				subtitle: 'Margen respecto a los bordes',
				text: ' Al menos un 10% de la dimensión total de la imagen.',
			},
			{
				subtitle: 'Número de ROIs',
				text: 'Mínimo 5 (uno en el centro y cuatro en las esquinas).',
			},
		],
	},
]

export const REFERENCES = [
	{
		title: '1. Protocolo Español de Control Radiológico.',
		description:
			'(2011). Guía de Procedimientos para la Evaluación de la Calidad en Imágenes Médicas. Ministerio de Sanidad, Consumo y Bienestar Social, España.',
		url: 'https://www.sanidad.gob.es/profesionales/radiodiagnostico/docs/protocolo_control_calidad.pdf',
	},
	{
		title: '2. Norma Oficial Mexicana NOM-229-SSA1-2002.',
		description:
			'(2002). Regulación de Instalación y Operación de Equipos de Rayos X para Diagnóstico Médico y Protección Radiológica Ocupacional. Secretaría de Salud, México.',
		url: 'https://www.dof.gob.mx/nota_detalle.php?codigo=728121&fecha=06/06/2003',
	},
	{
		title: '3. American College of Radiology (ACR).',
		description: '(2018). ACR Mammography Quality Control Manual.',
		url: 'https://www.acr.org/Clinical-Resources/Quality-Control-Manuals/Mammography',
	},
	{
		title: '4. European Federation of Organisations for Medical Physics (EFOMP)',
		description: 'Guidelines on Quality Control in Diagnostic Radiology.',
		url: 'https://www.efomp.org/index.php/resources/guidelines',
	},
	{
		title: '5. Dicom Standard.',
		description: '(2021). Digital Imaging and Communications in Medicine (DICOM) Standard.',
		url: 'https://www.dicomstandard.org/',
	},
]
