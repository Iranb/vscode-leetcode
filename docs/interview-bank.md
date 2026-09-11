# CV / ML / Agent Harness 面试题库

原创面试练习与基础参考答案；非公司真题。Agent Harness 指模型外围的执行、工具、状态、权限和评测系统。

每方向100道问答、20道手写题，共360道。问答直接显示基础答案；手写题的提交入口暂未接入判题。

## 通用机器学习

### ML-Q01 如何判断欠拟合和过拟合？

训练和验证误差都高，先查欠拟合、优化失败或数据问题；训练低而验证高，考虑过拟合或分布差异。结合学习曲线，不能仅凭单次指标下结论。

追问：增加数据与增加模型容量分别更可能解决什么问题？

延伸阅读：https://scikit-learn.org/stable/common_pitfalls.html

### ML-Q02 训练集、验证集和测试集如何划分？

训练集拟合参数，验证集选模型和阈值，测试集用于最终评估。同一用户或实体应按组隔离，时间预测按时间划分，避免未来信息泄漏。

追问：同一视频拆出的图片为何不能随意随机划分？

延伸阅读：https://scikit-learn.org/stable/common_pitfalls.html

### ML-Q03 标准化和特征选择为什么要放进 Pipeline？

先划分数据，仅在训练折拟合预处理，再变换验证折。Pipeline 可让交叉验证中的预处理随折重新拟合，避免全量预处理带来泄漏。

追问：缺失值填充是否也需要遵守这条规则？

延伸阅读：https://scikit-learn.org/stable/common_pitfalls.html

### ML-Q04 逻辑回归为何是分类模型？

它用 sigmoid 将线性分数映射为二分类概率，通常最小化负对数似然；以阈值产生类别。原始特征空间的决策边界是线性的，可通过特征变换扩展表达能力。

追问：与线性回归用均方误差拟合二分类相比有什么区别？

延伸阅读：https://scikit-learn.org/stable/modules/linear_model.html

### ML-Q05 L1 和 L2 正则化有什么区别？

L1 惩罚参数绝对值，可产生稀疏解；L2 惩罚参数平方，使参数平滑收缩。特征尺度影响惩罚，通常先标准化；正则强度需验证选择。

追问：相关特征很多时，L1 选择为何可能不稳定？

延伸阅读：https://scikit-learn.org/stable/modules/linear_model.html

### ML-Q06 Precision、Recall 和 F1 怎么解释？

Precision=TP/(TP+FP)，Recall=TP/(TP+FN)，F1 是两者调和平均。阈值变化会改变它们，分母为零要约定处理方式。

追问：漏检代价很高时如何选阈值？

延伸阅读：https://scikit-learn.org/stable/modules/model_evaluation.html

### ML-Q07 类别不平衡时为什么不能只看准确率？

多数类占比很高时，全预测多数类也能有高准确率。结合每类召回、PR 曲线和业务成本；重采样只作用于训练数据。

追问：macro 与 micro 平均有何差别？

延伸阅读：https://scikit-learn.org/stable/modules/model_evaluation.html

### ML-Q08 ROC-AUC、PR-AUC 和校准分别看什么？

ROC-AUC 关注正负样本排序，PR 更聚焦正类检出；校准看预测概率与实际频率是否一致。排序好不代表概率准；AP 与梯形积分 PR-AUC 的计算也不完全相同。

追问：为什么线上类别比例变化会影响 PR 指标？

延伸阅读：https://scikit-learn.org/stable/modules/model_evaluation.html

### ML-Q09 随机森林和 GBDT 的核心差别？

随机森林对样本和特征引入随机性，再聚合多棵树，主要降低方差；GBDT 顺序添加拟合损失负梯度的弱学习器。两者都要控制复杂度。

追问：为何 boosting 的学习率和树数需要一起调？

延伸阅读：https://scikit-learn.org/stable/modules/ensemble.html

### ML-Q10 K-means 的目标和局限？

交替分配最近中心并更新均值，以降低簇内平方欧氏距离。对尺度、离群点和初始化敏感，更适合近似球形簇；不保证全局最优。

追问：空簇如何处理？

延伸阅读：https://scikit-learn.org/stable/modules/clustering.html#k-means

### ML-Q11 PCA 在做什么？

对中心化数据找方差最大的正交方向，等价于相应线性低秩重构问题。它不使用标签，最大方差方向不一定最有分类价值；只在训练集拟合。

追问：何时应在 PCA 前标准化？

延伸阅读：https://scikit-learn.org/stable/modules/decomposition.html#pca

### ML-Q12 SVM 的间隔和核技巧？

SVM 平衡大间隔与分类违例；核函数通过内积形式隐式使用特征映射。C 越大通常越强调训练违例惩罚，RBF 的 gamma 控制局部影响范围。

追问：为什么 SVM 通常对特征尺度敏感？

延伸阅读：https://scikit-learn.org/stable/modules/svm.html

### ML-Q13 梯度下降如何更新参数？

沿负梯度方向更新 θ←θ−η∇L。小批量梯度有噪声但计算便宜；学习率过大会震荡，过小会慢。检查损失、梯度范数和输入尺度。

追问：为何训练前可先用少量样本验证能否过拟合？

延伸阅读：https://scikit-learn.org/stable/modules/sgd.html

### ML-Q14 交叉验证与超参数搜索怎么避免过度乐观？

只在训练数据内搜索；反复看同一验证集会对其适配。需要无偏比较时使用外层评估、内层调参的嵌套验证，最终测试集保持隔离。

追问：时间序列可以直接用普通随机 K 折吗？

延伸阅读：https://scikit-learn.org/stable/modules/cross_validation.html

### ML-Q15 离线提升、线上下降怎么排查？

依次检查特征口径、数据时间范围、标签延迟和分布变化，再看阈值与业务指标是否一致。用分群指标和灰度实验定位，不把所有退化归因于模型。

追问：如何区分数据漂移与概念漂移？

延伸阅读：https://scikit-learn.org/stable/common_pitfalls.html

### ML-Q16 条件概率和独立性有何关系？

专题：概率基础

P(A给定B)=P(A交B)/P(B)，要求P(B)>0。独立意味着知道B不改变A的概率；不相关只约束线性相关，通常不能推出独立。

延伸阅读：https://www.statlearning.com/

### ML-Q17 贝叶斯公式在分类中如何使用？

专题：概率基础

后验正比于似然乘先验。分类时比较各类后验；先验反映类别比例，似然描述特征生成规律。线上先验变化可能需要调整决策。

延伸阅读：https://www.statlearning.com/

### ML-Q18 最大似然与最大后验估计有何区别？

专题：概率基础

最大似然选择最能解释数据的参数；最大后验再乘参数先验。取负对数后，先验可以对应正则项；这种对应依赖具体分布假设。

延伸阅读：https://www.statlearning.com/

### ML-Q19 生成式模型和判别式模型有什么区别？

专题：概率基础

生成式方法建模联合分布或类条件分布与先验；判别式方法直接学习条件分布或决策边界。生成式不一定指能够生成图片的模型。

延伸阅读：https://www.statlearning.com/

### ML-Q20 朴素贝叶斯为什么在独立假设不成立时仍可能有效？

专题：概率基础

它假设给定类别后特征条件独立，简化了估计。假设近似错误时分类排序仍可能有用，但概率可能失准；平滑可避免未见事件导致零概率。

延伸阅读：https://www.statlearning.com/

### ML-Q21 置信区间应如何解释？

专题：统计推断

频率学派的95%置信区间描述构造程序的长期覆盖率，不是观测区间里参数有95%概率。区间宽度取决于样本量、噪声及建模假设。

延伸阅读：https://www.statlearning.com/

### ML-Q22 p值能表示模型更好的概率吗？

专题：统计推断

不能。p值是在零假设及检验假设下，得到当前或更极端统计量的概率。还应报告效应大小、区间和业务意义，不能只看是否小于0.05。

延伸阅读：https://www.statlearning.com/

### ML-Q23 Bootstrap如何估计指标的不确定性？

专题：统计推断

从样本中有放回重采样，重复计算指标形成经验分布。有用户、时间或群组相关时应采用相应重采样单位，普通逐行抽样可能低估波动。

延伸阅读：https://www.statlearning.com/

### ML-Q24 为什么多次试验容易得到偶然显著结果？

专题：统计推断

在许多假设中挑最小p值会增加假阳性。应预先定义主要比较，必要时控制家族错误率或假发现率，并保留独立验证。

延伸阅读：https://www.statlearning.com/

### ML-Q25 配对比较为什么可能比独立比较更有效？

专题：统计推断

同一测试样本或同一随机设置下比较差值，可消除共同难度造成的波动。配对方式必须有依据，不能把相关重复当作独立样本扩大样本量。

延伸阅读：https://www.statlearning.com/

### ML-Q26 普通最小二乘何时没有唯一解？

专题：回归模型

当设计矩阵列不满秩时，参数可能不唯一；预测仍可能确定。可使用伪逆、去除冗余特征或正则化，不能直接假定矩阵可逆。

延伸阅读：https://scikit-learn.org/stable/modules/linear_model.html

### ML-Q27 多重共线性会造成什么影响？

专题：回归模型

高度相关的特征使单个回归系数估计不稳定，方差增大；预测未必同样差。关注系数解释时应诊断相关性并报告不确定性。

延伸阅读：https://scikit-learn.org/stable/modules/linear_model.html

### ML-Q28 MSE、MAE与Huber损失怎样选择？

专题：回归模型

MSE对大残差惩罚更强，MAE更抗极端残差，Huber在小残差处二次、大残差处线性。选择取决于噪声和目标，不应机械删除大误差样本。

延伸阅读：https://scikit-learn.org/stable/modules/linear_model.html

### ML-Q29 回归残差出现异方差怎么办？

专题：回归模型

残差方差随输入变化时，先检查分群和目标尺度。可考虑加权拟合、目标变换或异方差模型；推断时使用适当稳健标准误。

延伸阅读：https://scikit-learn.org/stable/modules/linear_model.html

### ML-Q30 分位数回归和均值回归有何不同？

专题：回归模型

分位数回归通过pinball损失估计条件分位数，可用于风险上界或区间。多个分位数可能交叉，需要检查；覆盖率也需在独立数据上评估。

延伸阅读：https://scikit-learn.org/stable/modules/linear_model.html

### ML-Q31 多分类与多标签为什么不能使用同一输出约束？

专题：分类建模

多分类通常互斥，可用softmax使类别概率和为1；多标签允许多个标签同时成立，通常逐标签sigmoid。损失与缺失标签处理也要相应设计。

延伸阅读：https://scikit-learn.org/stable/modules/multiclass.html

### ML-Q32 One-vs-Rest与One-vs-One有什么取舍？

专题：分类建模

前者训练每类对其余类的分类器，后者训练每对类别的分类器。模型数量、训练样本规模及投票冲突不同，选择依赖基础学习器和类别数。

延伸阅读：https://scikit-learn.org/stable/modules/multiclass.html

### ML-Q33 交叉熵为何可以写成负对数似然？

专题：分类建模

对独热类别标签，交叉熵是正确类别概率的负对数；对样本求和就是独立观测的负对数似然。软标签交叉熵则是在目标分布下求期望。

延伸阅读：https://scikit-learn.org/stable/modules/multiclass.html

### ML-Q34 Softmax减去最大值为什么不改变结果？

专题：分类建模

所有logit减同一常数时，分子分母同时乘同一因子并抵消。减最大值避免指数上溢；计算log概率时可用log-sum-exp。

延伸阅读：https://scikit-learn.org/stable/modules/multiclass.html

### ML-Q35 类别权重会怎样影响预测概率？

专题：分类建模

加权损失改变优化中各类的相对代价，可能改善少数类决策，但输出不一定对应原始总体概率。需在目标分布验证或校准，不能直接当作无偏概率。

延伸阅读：https://scikit-learn.org/stable/modules/multiclass.html

### ML-Q36 决策树的Gini和信息熵分别衡量什么？

专题：决策树

两者衡量节点类别混杂程度，分裂选择加权不纯度下降。纯节点二者均为0；不同准则可能产生不同分裂，但不保证一个总更好。

延伸阅读：https://scikit-learn.org/stable/modules/tree.html

### ML-Q37 连续特征的树分裂阈值如何寻找？

专题：决策树

通常排序候选取值并比较阈值带来的损失下降；直方图方法将连续值分桶降低开销。搜索成本与候选数量、样本数和实现有关。

延伸阅读：https://scikit-learn.org/stable/modules/tree.html

### ML-Q38 预剪枝与后剪枝有何区别？

专题：决策树

预剪枝用最大深度、最小叶样本等提前限制生长；后剪枝先建较大树再按复杂度代价裁剪。两者都需通过验证选择强度。

延伸阅读：https://scikit-learn.org/stable/modules/tree.html

### ML-Q39 树模型为何通常不需要标准化？

专题：决策树

单特征阈值分裂主要依赖值的顺序，严格单调变换通常保持可分割集合。分桶、数值精度和正则实现可能影响结果，因此不是任何变换都无影响。

延伸阅读：https://scikit-learn.org/stable/modules/tree.html

### ML-Q40 树的缺失值路由如何处理？

专题：决策树

可显式填充加缺失指示，也可由支持缺失值的算法学习默认路由。不同实现能力不同，应确认预测时新缺失模式的行为。

延伸阅读：https://scikit-learn.org/stable/modules/tree.html

### ML-Q41 Bagging为什么能降低方差？

专题：集成学习

对多个不完全相关的估计取平均可抵消部分随机波动；相关性越高收益越小。它不能自动消除共同偏差，弱模型都犯同一错误时帮助有限。

延伸阅读：https://scikit-learn.org/stable/modules/ensemble.html

### ML-Q42 袋外评估是什么？

专题：集成学习

Bootstrap训练时未被某棵树抽中的样本可用于其袋外预测，再聚合成评估。它适用于相应采样机制，不替代存在群组或时间依赖时的合理划分。

延伸阅读：https://scikit-learn.org/stable/modules/ensemble.html

### ML-Q43 AdaBoost如何关注难样本？

专题：集成学习

经典分类AdaBoost提高误分类样本权重，后续弱学习器更关注它们，并加权组合。标签噪声也可能持续吸引权重，因此要控制噪声与复杂度。

延伸阅读：https://scikit-learn.org/stable/modules/ensemble.html

### ML-Q44 Stacking为什么需要折外预测？

专题：集成学习

第二层若用第一层在训练样本上的拟合预测训练，会看到过于乐观的特征。折外预测让每个样本由未训练过它的基础模型产生特征。

延伸阅读：https://scikit-learn.org/stable/modules/ensemble.html

### ML-Q45 直方图梯度提升为何能加速？

专题：集成学习

把特征离散为有限桶并累积梯度统计，减少候选分裂及内存访问。桶数是精度与成本的权衡，粗分桶可能丢失有用阈值。

延伸阅读：https://scikit-learn.org/stable/modules/ensemble.html

### ML-Q46 类别变量何时用独热、何时用序数编码？

专题：特征工程

无自然次序的类别常用独热；有真实顺序时可用序数编码。把任意类别编码为整数可能给某些模型引入虚假距离或次序。

延伸阅读：https://scikit-learn.org/stable/modules/preprocessing.html

### ML-Q47 目标编码如何防止泄漏？

专题：特征工程

每个训练样本的编码不能直接利用自身标签，应使用折外统计或有序方案并做平滑。验证和测试编码只能来自训练数据，未知类别需回退。

延伸阅读：https://scikit-learn.org/stable/modules/preprocessing.html

### ML-Q48 特征交叉有什么作用和风险？

专题：特征工程

交叉能把变量间交互显式提供给线性模型，但维度和稀疏性会增加。只保留有依据的交互，并在训练折内选择，避免搜索过拟合。

延伸阅读：https://scikit-learn.org/stable/modules/preprocessing.html

### ML-Q49 特征哈希的代价是什么？

专题：特征工程

将高基数特征映射到固定维度可控制内存，但碰撞会混合信息且解释困难。哈希维度、符号哈希及稳定映射影响表现。

延伸阅读：https://scikit-learn.org/stable/modules/preprocessing.html

### ML-Q50 数值特征什么时候适合对数变换？

专题：特征工程

正值且右偏、乘性关系明显时可尝试；零可考虑log1p，负值需另选变换。变换后误差的业务含义改变，反变换也可能存在均值偏差。

延伸阅读：https://scikit-learn.org/stable/modules/preprocessing.html

### ML-Q51 缺失机制MCAR、MAR、MNAR有什么区别？

专题：数据质量

MCAR指缺失与数据无关；MAR在给定已观测变量后不依赖缺失值；MNAR仍依赖未观测值。仅凭已观测数据通常难确认机制，需领域知识与敏感性分析。

延伸阅读：https://scikit-learn.org/stable/modules/impute.html

### ML-Q52 为什么填充均值后还可加入缺失指示？

专题：数据质量

缺失本身可能携带信息，指示变量让模型区分真实均值和填充值。但若缺失来源在线变化，这种信号也可能失效。

延伸阅读：https://scikit-learn.org/stable/modules/impute.html

### ML-Q53 异常值该删除还是保留？

专题：数据质量

先区分录入错误与真实稀有事件，再按任务决定修正、稳健建模或保留。依据测试表现删难样本会扭曲评估，规则应事先明确。

延伸阅读：https://scikit-learn.org/stable/modules/impute.html

### ML-Q54 如何发现训练测试集的近重复样本？

专题：数据质量

结合实体ID、内容哈希或相似度聚类建立重复组，再按组划分。完全哈希找不到轻微编辑版本，近重复阈值需人工抽查。

延伸阅读：https://scikit-learn.org/stable/modules/impute.html

### ML-Q55 标签噪声如何排查？

专题：数据质量

抽查高损失、模型分歧和边界样本，分析标注规则与标注者一致性。高损失也可能是真难样本，不能直接把模型不同意的标签改掉。

延伸阅读：https://scikit-learn.org/stable/modules/impute.html

### ML-Q56 K-means++为什么有帮助？

专题：聚类方法

以距离已有中心的平方加权选择新中心，使初始中心更分散，通常减少差的初始化。仍可能落到局部最优，需多次初始化比较。

延伸阅读：https://scikit-learn.org/stable/modules/clustering.html

### ML-Q57 DBSCAN如何识别簇和噪声？

专题：聚类方法

依据邻域半径和最小点数确定核心点，并连接密度可达区域；未归入簇的点标为噪声。不同密度、高维距离退化会使参数选择困难。

延伸阅读：https://scikit-learn.org/stable/modules/clustering.html

### ML-Q58 GMM与K-means的分配有什么区别？

专题：聚类方法

GMM用混合概率分布给软责任度，可表示不同协方差；K-means给最近中心硬分配。GMM需限制协方差退化并选择成分数。

延伸阅读：https://scikit-learn.org/stable/modules/clustering.html

### ML-Q59 轮廓系数怎样解释？

专题：聚类方法

比较样本到本簇的平均距离与最近其他簇的平均距离，越高通常表示更紧密分离。它依赖距离和簇形状，不等同于真实业务类别质量。

延伸阅读：https://scikit-learn.org/stable/modules/clustering.html

### ML-Q60 EM算法每一步在做什么？

专题：聚类方法

E步用当前参数估计隐变量后验，M步最大化相应期望完整数据对数似然。标准条件下目标不下降，但不保证全局最优。

延伸阅读：https://scikit-learn.org/stable/modules/clustering.html

### ML-Q61 PCA和SVD有什么联系？

专题：降维与表示

对中心化数据做SVD，右奇异向量给主方向，奇异值决定解释方差。直接对未中心化矩阵做截断SVD与标准PCA并不相同。

延伸阅读：https://scikit-learn.org/stable/modules/decomposition.html

### ML-Q62 PCA白化有什么作用？

专题：降维与表示

按主成分方差缩放，使保留分量具有单位方差。它去除尺度信息，也可能放大小方差噪声，是否有益取决于下游任务。

延伸阅读：https://scikit-learn.org/stable/modules/decomposition.html

### ML-Q63 t-SNE图上的簇间距离可信吗？

专题：降维与表示

t-SNE主要保留局部邻域，二维图中远距离及簇面积不应作严格定量解释。随机种子和参数会改变布局，不能仅凭图证明可分性。

延伸阅读：https://scikit-learn.org/stable/modules/decomposition.html

### ML-Q64 监督特征选择和无监督降维怎么选？

专题：降维与表示

前者利用标签选择与目标相关的特征，后者压缩输入结构。都应在训练折拟合；降维可能保留高方差却丢失弱但有效的分类信号。

延伸阅读：https://scikit-learn.org/stable/modules/decomposition.html

### ML-Q65 为什么高维最近邻可能变差？

专题：降维与表示

维度增加时距离可能集中，样本覆盖稀疏且无关特征累积噪声。需选择合适尺度、表示和度量，而不只是更换搜索索引。

延伸阅读：https://scikit-learn.org/stable/modules/decomposition.html

### ML-Q66 随机过采样的局限是什么？

专题：不平衡与采样

重复少数类提高其训练频率，但不创造新信息，可能过拟合少数样本。应只在训练折处理，并在原始分布评估。

延伸阅读：https://imbalanced-learn.org/stable/user_guide.html

### ML-Q67 SMOTE何时可能生成不合理样本？

专题：不平衡与采样

它在少数类邻居间插值；类别边界、离群点或混合离散特征可能使插值无意义。邻居构造和特征表示必须符合数据语义。

延伸阅读：https://imbalanced-learn.org/stable/user_guide.html

### ML-Q68 欠采样为何有信息损失风险？

专题：不平衡与采样

减少多数类可降低成本和偏斜，但可能丢掉重要边界与多样性。可比较多次采样或集成方法，评估多数类表现是否退化。

延伸阅读：https://imbalanced-learn.org/stable/user_guide.html

### ML-Q69 如何按误报漏报成本选择阈值？

专题：不平衡与采样

在概率校准且成本设定适当时，可按期望成本比较行动；实践中在验证集按成本曲线选择。部署后应监控先验和成本变化。

延伸阅读：https://imbalanced-learn.org/stable/user_guide.html

### ML-Q70 训练采样比例与线上比例不同怎么办？

专题：不平衡与采样

先明确是否只是先验变化；必要时做先验修正或在代表性验证集校准。若类条件分布也变，单纯调整先验通常不足。

延伸阅读：https://imbalanced-learn.org/stable/user_guide.html

### ML-Q71 Macro-F1为什么不等于平均Precision和Recall的F1？

专题：评估细节

Macro-F1先逐类计算F1再平均，后者先平均Precision和Recall再取调和平均；非线性运算使两者通常不同。

延伸阅读：https://scikit-learn.org/stable/modules/model_evaluation.html

### ML-Q72 Top-k准确率适合什么场景？

专题：评估细节

只要真类在前k个预测中就算正确，适合候选推荐或多类别检索辅助。它不反映候选内部排序及错误代价，也不能替代Top-1需求。

延伸阅读：https://scikit-learn.org/stable/modules/model_evaluation.html

### ML-Q73 检索任务的MRR与NDCG有什么区别？

专题：评估细节

MRR看第一个相关结果的倒数排名；NDCG允许分级相关性并对靠前结果加权。评估需固定候选集、截断位置和相关性标注。

延伸阅读：https://scikit-learn.org/stable/modules/model_evaluation.html

### ML-Q74 R²可以为负吗？

专题：评估细节

可以，测试误差大于按相应均值基准预测的误差时可能为负。常量目标会使分母为零，不同库处理约定需明确。

延伸阅读：https://scikit-learn.org/stable/modules/model_evaluation.html

### ML-Q75 为什么要按用户而非按样本计算某些指标？

专题：评估细节

活跃用户贡献大量样本会主导逐样本平均。按用户平均回答不同问题；应同时考虑流量加权效果与用户公平性，预先定义口径。

延伸阅读：https://scikit-learn.org/stable/modules/model_evaluation.html

### ML-Q76 凸问题为什么也可能收敛很慢？

专题：优化细节

曲率方向差异大、尺度不合理或学习率不合适都会拖慢优化。凸性不意味着数值条件好，可用缩放、预条件或更合适的算法。

延伸阅读：https://scikit-learn.org/stable/modules/sgd.html

### ML-Q77 Momentum如何平滑更新？

专题：优化细节

维护梯度方向的指数累积，使持续方向得到增强、交替噪声部分抵消。过大动量配大学习率也可能震荡，需联合调节。

延伸阅读：https://scikit-learn.org/stable/modules/sgd.html

### ML-Q78 学习率调度与早停解决什么不同问题？

专题：优化细节

调度改变优化步长；早停根据验证表现限制训练时长，兼有正则作用。早停必须记录最佳检查点，不能默认最后一次就是最佳。

延伸阅读：https://scikit-learn.org/stable/modules/sgd.html

### ML-Q79 为什么不同batch大小不能总保持同一学习率？

专题：优化细节

batch改变梯度噪声、每轮更新次数和优化动态。线性缩放只是某些范围内的经验，不保证对所有模型和预算成立。

延伸阅读：https://scikit-learn.org/stable/modules/sgd.html

### ML-Q80 如何用数值梯度检查手写导数？

专题：优化细节

在小规模双精度数据上用中心差分比较解析梯度，并观察相对误差。步长过大截断误差高、过小舍入误差高，非光滑点应避开。

延伸阅读：https://scikit-learn.org/stable/modules/sgd.html

### ML-Q81 随机搜索为什么可能优于网格搜索？

专题：调参与验证

当只有少数超参数重要时，随机搜索能探索更多不同的重要参数取值；网格把预算浪费在不敏感维度。优势依赖搜索空间设计。

延伸阅读：https://scikit-learn.org/stable/modules/grid_search.html

### ML-Q82 贝叶斯优化如何利用历史试验？

专题：调参与验证

用代理模型估计配置表现和不确定性，再通过采集策略平衡探索与利用。高噪声、条件参数及并行延迟会影响效率。

延伸阅读：https://scikit-learn.org/stable/modules/grid_search.html

### ML-Q83 早停搜索与完整训练排名为何可能不同？

专题：调参与验证

慢热配置在小预算下可能被误判，学习率调度也会改变早期曲线。应对候选做足预算复核，避免把小预算排名当最终结论。

延伸阅读：https://scikit-learn.org/stable/modules/grid_search.html

### ML-Q84 嵌套参数的搜索空间怎么定义？

专题：调参与验证

只在相关模型或分支启用其参数，例如某种核才需要对应参数。无效组合浪费预算，搜索范围应结合量纲及对数尺度。

延伸阅读：https://scikit-learn.org/stable/modules/grid_search.html

### ML-Q85 为什么要记录失败的调参试验？

专题：调参与验证

失败暴露数值稳定性、资源限制和约束边界，也有助于避免重复浪费。只保留成功试验会掩盖真实成本与选择偏差。

延伸阅读：https://scikit-learn.org/stable/modules/grid_search.html

### ML-Q86 置换重要性会受相关特征影响吗？

专题：可解释性

会。相关特征可相互替代，打乱一个时模型仍利用另一个，使重要性被低估；也可能产生不真实组合。应结合分组置换和领域解释。

延伸阅读：https://scikit-learn.org/stable/modules/inspection.html

### ML-Q87 树的不纯度重要性有什么偏差？

专题：可解释性

候选分裂多的高基数特征更容易获得较高重要性；训练集不纯度下降也可能来自过拟合。可用独立数据的置换重要性补充。

延伸阅读：https://scikit-learn.org/stable/modules/inspection.html

### ML-Q88 SHAP值是否表示因果作用？

专题：可解释性

不是。它按特定背景分布和价值函数分配预测贡献；特征依赖与背景选择会改变解释。干预效果需要额外因果假设与设计。

延伸阅读：https://scikit-learn.org/stable/modules/inspection.html

### ML-Q89 PDP与ICE曲线有什么区别？

专题：可解释性

PDP对样本的预测变化取平均，ICE展示各样本曲线。特征相关时替换某一特征可能产生不现实组合，平均也可能掩盖异质性。

延伸阅读：https://scikit-learn.org/stable/modules/inspection.html

### ML-Q90 全局解释和局部解释怎么区分？

专题：可解释性

全局解释概括整体规律，局部解释说明某次预测。局部理由不能自动推广为总体机制，两者都应验证稳定性与适用范围。

延伸阅读：https://scikit-learn.org/stable/modules/inspection.html

### ML-Q91 模型文件之外还需要版本化什么？

专题：部署与监控

特征定义、预处理、标签映射、依赖和训练数据版本都决定推理结果。仅保存权重不能保证可复现，应保存完整推理契约与示例。

延伸阅读：https://scikit-learn.org/stable/model_persistence.html

### ML-Q92 训练服务偏差是什么？

专题：部署与监控

同一特征在训练和线上计算方式不同，例如时间窗口、缺失处理或默认值不一致。用共享变换和线上离线样本对账发现问题。

延伸阅读：https://scikit-learn.org/stable/model_persistence.html

### ML-Q93 数据漂移和概念漂移的差别？

专题：部署与监控

数据漂移常指输入分布变化，概念漂移指标签给定输入的关系变化。前者不必导致性能下降，后者常需新标签才能可靠确认。

延伸阅读：https://scikit-learn.org/stable/model_persistence.html

### ML-Q94 线上标签延迟时如何监控？

专题：部署与监控

先监控数据质量、预测分布和系统指标，用成熟标签窗口补充性能。代理指标不能替代真实效果，需避免将未到标签当负类。

延伸阅读：https://scikit-learn.org/stable/model_persistence.html

### ML-Q95 模型灰度发布为什么需要回滚条件？

专题：部署与监控

离线测试覆盖有限，灰度可在有限流量检验效果。预先设定质量、延迟和错误率阈值，保持旧模型及兼容特征可快速恢复。

延伸阅读：https://scikit-learn.org/stable/model_persistence.html

### ML-Q96 A/B测试为什么要选择正确随机化单位？

专题：实验与业务

若同一用户跨组或群体互相影响，独立性和因果解释会受损。按用户、组织或区域随机化需结合干扰范围，并按同层级分析。

延伸阅读：https://www.statlearning.com/

### ML-Q97 观察相关性为何不能直接推出因果？

专题：实验与业务

混杂、选择偏差和反向因果都可能产生相关。随机实验或可信识别假设才能支持干预效果，预测准确率不提供这些保证。

延伸阅读：https://www.statlearning.com/

### ML-Q98 多个模型差异很小如何决策？

专题：实验与业务

检查置信区间、关键分群、成本和稳定性。如果差异不确定，优先更易维护的方案或追加有针对性的实验，而非宣称微小数值优势。

延伸阅读：https://www.statlearning.com/

### ML-Q99 一个完整机器学习项目应怎样讲述？

专题：实验与业务

说明业务目标、数据与标签、划分策略、模型选择、误差分析、上线约束和验证结果。明确个人贡献及失败尝试，避免只罗列算法名字。

延伸阅读：https://www.statlearning.com/

### ML-Q100 什么时候不应该上复杂模型？

专题：实验与业务

数据或标签质量差、样本少、延迟严格或简单规则已满足目标时，复杂模型可能不划算。先建立可解释的对照并量化增益与维护成本。

延伸阅读：https://www.statlearning.com/

### ML-C01 稳定 Softmax

使用 NumPy；输入有限浮点二维数组 (N,C)，C>0；逐行输出概率，支持 N=0。禁止调用现成 softmax。

验收示例：[[1000,1000]] → [[0.5,0.5]]；各行和约为 1。

```python
def softmax(x):
    raise NotImplementedError("请实现")

```

### ML-C02 逻辑回归的一步梯度更新

使用 NumPy；X:(N,D)、y:(N,) 为 0/1、w:(D,)、b 标量，N>0。对平均二元交叉熵做一步梯度下降，无正则；返回新 w,b，不修改输入。

验收示例：X=[[1]],y=[1],w=[0],b=0,lr=1 → w=[0.5],b=0.5。

```python
def logistic_step(X, y, w, b, lr):
    raise NotImplementedError("请实现")

```

### ML-C03 K-means

使用 NumPy；X:(N,D)，初始中心:(K,D)，N>=K>0。距离并列取最小中心索引，空簇保持旧中心。最多 max_iter 轮，中心最大绝对变化<=tol 停止；返回最终中心与基于最终中心的标签。

验收示例：X=[[0],[2],[10],[12]],centers=[[0],[10]] → centers=[[1],[11]],labels=[0,0,1,1]。

```python
def kmeans(X, centers, max_iter=100, tol=1e-6):
    raise NotImplementedError("请实现")

```

### ML-C04 二分类指标

只用标准库；输入等长 0/1 列表，返回含 precision、recall、f1 的字典；任一指标分母为零返回 0.0，空输入允许。

验收示例：true=[1,1,0],pred=[1,0,1] → 三个指标都是 0.5。

```python
def binary_metrics(y_true, y_pred):
    raise NotImplementedError("请实现")

```

### ML-C05 训练集标准化

使用 NumPy；训练和测试二维数组列数相同，训练非空。只用训练集均值、总体标准差(ddof=0)，零标准差替换为1；返回变换后的训练、测试数组及均值、scale。

验收示例：train=[[1],[3]],test=[[5]] → train=[[-1],[1]],test=[[3]],mean=[2],scale=[1]。

```python
def standardize(train, test):
    raise NotImplementedError("请实现")

```

### ML-C06 稳定Sigmoid

NumPy；输入任意形状有限浮点数组，返回同形状sigmoid，避免大绝对值导致指数溢出。不得调用现成sigmoid。

验收示例：[0,1000,-1000] → 约[0.5,1,0]。

```python
def sigmoid(x):
    raise NotImplementedError("请实现")

```

### ML-C07 多分类交叉熵

NumPy；logits:(N,C)，labels:(N,)为合法类别整数，N,C>0；返回平均交叉熵标量，用log-sum-exp稳定计算，不先取可能下溢的概率。

验收示例：logits=[[0,0]],labels=[1] → log(2)。

```python
def cross_entropy(logits, labels):
    raise NotImplementedError("请实现")

```

### ML-C08 K近邻分类

NumPy或标准库；train:(N,D)、labels为非负整数、query:(M,D)，1<=k<=N。欧氏距离同分按训练索引升序，多数投票同分取最小类别；返回M个标签。

验收示例：train=[[0],[2]],labels=[1,0],query=[[1]],k=2 → [0]。

```python
def knn_predict(train, labels, query, k=3):
    raise NotImplementedError("请实现")

```

### ML-C09 分层划分索引

标准库；labels列表，每类按首次出现顺序处理并用局部random.Random(seed)打乱索引。每类前floor(n*test_ratio)个进入测试，其余训练；返回分别升序的两组索引，0<=test_ratio<1，不修改全局随机状态。

验收示例：labels=[0,0,1,1],ratio=0.5 → 训练和测试各2个，各含一例每类。

```python
def stratified_split(labels, test_ratio=0.2, seed=0):
    raise NotImplementedError("请实现")

```

### ML-C10 岭回归闭式求解

NumPy；X:(N,D)、y:(N,)，N,D>0，alpha>0；不加入截距，求解(XᵀX+alpha I)w=Xᵀy，禁止显式求逆，返回w。

验收示例：X=[[1]],y=[2],alpha=1 → [1]。

```python
def ridge_fit(X, y, alpha=1.0):
    raise NotImplementedError("请实现")

```

### ML-C11 PCA投影

NumPy；训练二维矩阵至少2行，1<=k<=min(N,D)。中心化后SVD，按奇异值降序保留k个方向；每方向绝对值最大分量调为非负（并列最小索引）。返回投影、方向行矩阵、均值。

验收示例：X=[[1,0],[3,0]],k=1 → 投影[[-1],[1]]，方向[[1,0]]，均值[2,0]。

```python
def pca_fit_transform(X, k):
    raise NotImplementedError("请实现")

```

### ML-C12 混淆矩阵

NumPy或标准库；真实和预测等长标签均在[0,num_classes)，返回行真实列预测的计数矩阵。空输入返回全0矩阵，num_classes必须正整数。

验收示例：true=[0,1,1],pred=[0,0,1],C=2 → [[1,0],[1,1]]。

```python
def confusion_matrix(y_true, y_pred, num_classes):
    raise NotImplementedError("请实现")

```

### ML-C13 二分类ROC-AUC

标准库；等长labels和有限scores，labels为0/1且两类都存在，否则ValueError。按随机正例分数高于负例的概率定义，同分计0.5，返回标量。

验收示例：labels=[0,1],scores=[0.5,0.5] → 0.5；scores=[0,1] → 1。

```python
def roc_auc(labels, scores):
    raise NotImplementedError("请实现")

```

### ML-C14 Bootstrap均值区间

NumPy；非空有限一维x，n_resamples>=2，0<confidence<1；局部default_rng(seed)有放回抽样，每次长度等于x。返回bootstrap均值的两侧等尾分位数，quantile用linear方法。

验收示例：x=[2,2,2] → (2,2)。同seed结果相同，不修改输入。

```python
def bootstrap_mean_ci(x, n_resamples=1000, confidence=0.95, seed=0):
    raise NotImplementedError("请实现")

```

### ML-C15 线性回归梯度训练

NumPy；X:(N,D)、y:(N,)，N,D>0。w,b从0开始，优化L=mean((Xw+b-y)^2)，完整batch更新steps次，返回w,b及每次更新前损失列表；steps>=0。

验收示例：X=[[1]],y=[1],lr=0.1,steps=1 → w=[0.2],b=0.2,losses=[1]。

```python
def linear_regression_gd(X, y, lr=0.01, steps=100):
    raise NotImplementedError("请实现")

```

### ML-C16 类别均值编码器

标准库；训练类别为字符串，y有限数且训练非空；每类编码=(该类标签和+alpha*全局均值)/(该类计数+alpha)，alpha>=0。返回给定query类别编码，未知类用全局均值。本题仅用于独立query，训练特征需另做折外编码。

验收示例：train=[a,a,b],y=[0,1,1],query=[z],alpha=1 → [2/3]。

```python
def target_encode(train_categories, y, query_categories, alpha=1.0):
    raise NotImplementedError("请实现")

```

### ML-C17 高斯朴素贝叶斯预测

NumPy；训练X:(N,D)、整数标签、query:(M,D)。每类总体方差加eps>0，用经验类先验及对数似然；同分取最小类别。返回query标签，不允许直接调用分类器。

验收示例：X=[[0],[0],[10],[10]],labels=[0,0,1,1],query=[[0],[10]] → [0,1]。

```python
def gaussian_nb_predict(X, labels, query, eps=1e-9):
    raise NotImplementedError("请实现")

```

### ML-C18 可复现小批量索引

标准库；n>=0，batch_size>0。以局部Random(seed)打乱0..n-1，再分批；drop_last决定是否丢弃不足一批的尾部，返回索引列表的列表。

验收示例：n=5,batch_size=2 → 批长度[2,2,1]，不重不漏；drop_last=True为[2,2]。

```python
def make_batches(n, batch_size, seed=0, drop_last=False):
    raise NotImplementedError("请实现")

```

### ML-C19 余弦相似度矩阵

NumPy；A:(N,D)、B:(M,D)，有限浮点且D>0。返回(N,M)相似度，任一向量为零时定义相似度0；不修改输入。

验收示例：A=[[1,0],[0,0]],B=[[1,0],[0,1]] → [[1,0],[0,0]]。

```python
def cosine_similarity(A, B):
    raise NotImplementedError("请实现")

```

### ML-C20 NDCG@k

标准库；输入已按预测顺序排列的非负整数相关性列表，k>0。gain=2**rel-1，折扣log2(rank+1)，rank从1起；理想排序取全列表降序，理想DCG为0返回0。

验收示例：relevance=[3,2,1],k=3 → 1；全0 → 0。

```python
def ndcg_at_k(relevance, k):
    raise NotImplementedError("请实现")

```

## 计算机视觉

### CV-Q01 卷积输出尺寸与参数量怎么算？

单轴输出=floor((输入+2p−d(k−1)−1)/s+1)。二维卷积权重数=Cout×(Cin/groups)×kh×kw，若有 bias 再加 Cout。注意整除约束与张量布局。

追问：3×3、stride=2、padding=1 时奇偶输入有什么区别？

延伸阅读：https://docs.pytorch.org/docs/stable/generated/torch.nn.modules.conv.Conv2d.html

### CV-Q02 卷积的归纳偏置是什么？

局部连接与权重共享减少参数，平移等变性让位置变化时特征相应移动；边界填充和下采样会影响这种性质。卷积不天然保证尺度或旋转不变。

追问：全连接层与卷积层参数量怎么比较？

延伸阅读：https://docs.pytorch.org/docs/stable/generated/torch.nn.modules.conv.Conv2d.html

### CV-Q03 反向传播与梯度消失怎么理解？

反向传播用链式法则计算梯度；多层小导数相乘可能使梯度衰减，大导数也可能放大。检查激活、初始化和网络结构；残差连接有助于梯度传播。

追问：梯度裁剪解决的是消失还是爆炸？

延伸阅读：https://docs.pytorch.org/tutorials/beginner/blitz/autograd_tutorial.html

### CV-Q04 ResNet 为什么更容易训练？

残差块学习 y=x+F(x)，为信息和梯度提供直接通路，缓解深层优化困难。维度变化时需要投影，残差连接并不自动消除过拟合。

追问：残差分支为零时网络在表达什么？

延伸阅读：https://arxiv.org/abs/1512.03385

### CV-Q05 BatchNorm 与 LayerNorm 区别？

BN 按通道跨批次及空间位置统计；训练通常更新运行统计，推理通常使用它们。LN 对每个样本的指定维度归一化，不依赖批次大小。

追问：小 batch 或域偏移时 BN 可能遇到什么问题？

延伸阅读：https://docs.pytorch.org/docs/stable/generated/torch.nn.modules.batchnorm.BatchNorm2d.html

### CV-Q06 train、eval 和 no_grad 是一回事吗？

train/eval 控制 Dropout、BN 等层的行为；no_grad 禁止记录梯度，两者独立。验证时通常同时使用 eval 和无梯度上下文，之后恢复训练模式。

追问：冻结参数后 BN 的运行统计还会更新吗？

延伸阅读：https://docs.pytorch.org/docs/stable/notes/autograd.html#locally-disabling-gradient-computation

### CV-Q07 Adam、SGD 和 AdamW 如何选择？

SGD 按梯度更新，可配动量；Adam 使用一、二阶矩自适应缩放。AdamW 将权重衰减与自适应梯度更新解耦。选择要配合学习率、预算和验证结果。

追问：为什么 Adam 中 L2 惩罚不总等价于解耦权重衰减？

延伸阅读：https://docs.pytorch.org/docs/stable/optim.html

### CV-Q08 数据增强有什么边界？

增强必须保留任务标签语义，检测框和分割掩码需同步变换；验证流程应固定并避免训练增强泄漏。旋转、翻转是否合理取决于场景。

追问：文字识别能直接使用任意水平翻转吗？

延伸阅读：https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html

### CV-Q09 迁移学习什么时候冻结、什么时候微调？

数据少时可先冻结骨干训练头部，再用较小学习率逐步解冻；域差异大时更可能需要调整骨干。冻结梯度不等于冻结 BN 状态。

追问：如何判断预训练特征是否适合当前任务？

延伸阅读：https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html

### CV-Q10 分类、检测和分割的输出有何不同？

分类预测图像类别，检测预测实例框和类别，语义分割预测像素类别，实例分割还区分同类实例。标签、损失和指标应随任务变化。

追问：拥挤场景里语义分割缺少什么信息？

延伸阅读：https://docs.pytorch.org/tutorials/intermediate/torchvision_tutorial.html

### CV-Q11 IoU、NMS 和检测 AP 怎么解释？

IoU 是交并比；NMS 按置信度保留框并抑制重叠框，通常按类别执行；检测 AP 依赖匹配规则、IoU 阈值和 PR 计算协议。不同协议下的 mAP 不能直接比较。

追问：NMS 为什么可能伤害拥挤目标的召回？

延伸阅读：https://cocodataset.org/#detection-eval

### CV-Q12 Dice 与 IoU 的关系？

二值集合上 Dice=2TP/(2TP+FP+FN)，IoU=TP/(TP+FP+FN)，故 Dice=2IoU/(1+IoU)。多类平均与平滑项会影响实现；空掩码要明确约定。

追问：背景占比极大时像素准确率为何会误导？

延伸阅读：https://scikit-learn.org/stable/modules/model_evaluation.html

### CV-Q13 Attention 为什么除以 sqrt(dk)？

注意力计算 softmax(QKᵀ/sqrt(dk))V。在分量近似独立、方差适当的假设下，缩放控制点积分数方差，避免 softmax 过饱和。

追问：padding mask 与 causal mask 分别屏蔽什么？

延伸阅读：https://arxiv.org/abs/1706.03762

### CV-Q14 ViT 与 CNN 如何比较？

ViT 将图像切为 patch token，通过注意力交换信息并加入位置信息；CNN 更显式编码局部性。效果依赖预训练、数据和计算预算，不能笼统说谁更好。

追问：分辨率增加时全局注意力的代价怎样变化？

延伸阅读：https://arxiv.org/abs/2010.11929

### CV-Q15 视觉实验怎么证明改动有效？

固定数据划分、训练预算和评估协议，做逐项消融并报告多次运行波动。与论文数字比较前核实协议，不把低质量复现上的收益当成超过论文。

追问：精度提升但延迟翻倍是否值得？

延伸阅读：https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html

### CV-Q16 1×1卷积有什么用途？

专题：卷积结构

它在每个空间位置混合通道，可升降维或形成瓶颈。单层1×1卷积不直接扩大空间感受野，但与其他层组合可提高表达效率。

延伸阅读：https://docs.pytorch.org/docs/stable/generated/torch.nn.Conv2d.html

### CV-Q17 深度可分离卷积如何减少计算？

专题：卷积结构

先逐通道空间卷积，再用逐点卷积混合通道，通常比标准卷积参数和乘加少。实际速度还依赖算子与硬件，不一定按理论比例加速。

延伸阅读：https://docs.pytorch.org/docs/stable/generated/torch.nn.Conv2d.html

### CV-Q18 空洞卷积有什么优缺点？

专题：卷积结构

在核元素间插空可扩大采样范围而不增加核参数；可能出现栅格效应，局部连续信息覆盖不足。常结合不同膨胀率或普通卷积。

延伸阅读：https://docs.pytorch.org/docs/stable/generated/torch.nn.Conv2d.html

### CV-Q19 转置卷积等于卷积的逆吗？

专题：卷积结构

不是，它对应某个卷积线性算子的转置，用于上采样相关映射。通常不能恢复丢失信息；核和步长选择不当可能产生棋盘伪影。

延伸阅读：https://docs.pytorch.org/docs/stable/generated/torch.nn.Conv2d.html

### CV-Q20 理论感受野与有效感受野有何差别？

专题：卷积结构

理论感受野是可能影响输出的输入范围；有效感受野反映实际影响强度分布，常集中在其中部分区域。更大理论范围不保证充分利用上下文。

延伸阅读：https://docs.pytorch.org/docs/stable/generated/torch.nn.Conv2d.html

### CV-Q21 ReLU为何可能出现死亡神经元？

专题：激活与初始化

输入持续落在负区间时梯度为零，参数可能难恢复。学习率、偏置和输入分布都有关，可考虑更平稳训练或带负区间斜率的激活。

延伸阅读：https://docs.pytorch.org/docs/stable/nn.init.html

### CV-Q22 Sigmoid与Tanh饱和有什么问题？

专题：激活与初始化

绝对输入很大时导数接近零，层层传播可能衰减。Tanh输出零中心但仍会饱和；选择要结合网络结构与输出语义。

延伸阅读：https://docs.pytorch.org/docs/stable/nn.init.html

### CV-Q23 GELU与ReLU有什么不同？

专题：激活与初始化

ReLU硬截断负值，GELU按输入大小平滑门控。GELU常用于Transformer，但额外平滑不意味着在所有任务上优于ReLU。

延伸阅读：https://docs.pytorch.org/docs/stable/nn.init.html

### CV-Q24 Xavier与Kaiming初始化依据是什么？

专题：激活与初始化

二者试图控制前后传播的方差；Xavier常对应较对称激活，Kaiming考虑ReLU类非线性的影响。fan-in/fan-out模式需配合层使用。

延伸阅读：https://docs.pytorch.org/docs/stable/nn.init.html

### CV-Q25 为什么隐藏层不能全部零初始化？

专题：激活与初始化

同层神经元会保持对称，接收相同梯度而学不到不同特征。某些偏置或残差末层可特殊初始化为零，但不能推广为全部权重都置零。

延伸阅读：https://docs.pytorch.org/docs/stable/nn.init.html

### CV-Q26 GroupNorm与BatchNorm在小批量下有什么区别？

专题：归一化与正则

GroupNorm在单样本内按通道组统计，不依赖批次统计，适合某些小batch场景；组数影响行为，不能保证所有任务都有收益。

延伸阅读：https://docs.pytorch.org/docs/stable/nn.html

### CV-Q27 InstanceNorm为什么常见于风格处理？

专题：归一化与正则

它按样本和通道的空间位置归一化，弱化部分对比度和风格统计。也可能移除任务所需信息，应按目标选择。

延伸阅读：https://docs.pytorch.org/docs/stable/nn.html

### CV-Q28 Dropout训练和推理如何保持尺度一致？

专题：归一化与正则

常见倒置Dropout在训练时对保留激活除以保留概率，推理时不随机丢弃。它使期望尺度相近，但不保证非线性网络输出完全相同。

延伸阅读：https://docs.pytorch.org/docs/stable/nn.html

### CV-Q29 Label smoothing的收益与代价？

专题：归一化与正则

把硬标签混入少量平滑分布，抑制极端自信，可能改善泛化。也可能损失类别相似信息或影响蒸馏与校准，强度需要验证。

延伸阅读：https://docs.pytorch.org/docs/stable/nn.html

### CV-Q30 随机深度与Dropout有何区别？

专题：归一化与正则

随机深度通常随机跳过整条残差分支，而Dropout多作用于激活元素。训练与推理应正确缩放，二者改变的随机结构不同。

延伸阅读：https://docs.pytorch.org/docs/stable/nn.html

### CV-Q31 混合精度为什么能节省资源？

专题：训练工程

部分算子使用低精度降低显存与计算成本，关键累计或敏感算子保留较高精度。收益依赖硬件；需要检查溢出、下溢和最终精度。

延伸阅读：https://docs.pytorch.org/tutorials/recipes/recipes/amp_recipe.html

### CV-Q32 FP16训练为什么常用loss scaling？

专题：训练工程

放大损失使小梯度不易下溢，更新前再还原梯度。动态缩放可在溢出时跳过或调整更新；BF16的指数范围不同，需求不能直接照搬。

延伸阅读：https://docs.pytorch.org/tutorials/recipes/recipes/amp_recipe.html

### CV-Q33 梯度累积何时不等价于大batch？

专题：训练工程

若损失缩放正确且无其他差异，可近似更大有效batch；BN统计、Dropout随机性及调度步数会让结果不同，不能只比较样本总数。

延伸阅读：https://docs.pytorch.org/tutorials/recipes/recipes/amp_recipe.html

### CV-Q34 梯度裁剪应放在混合精度的哪一步？

专题：训练工程

若梯度被缩放，应先unscale再裁剪，然后执行优化器更新。对仍被缩放的梯度裁剪会改变实际阈值。

延伸阅读：https://docs.pytorch.org/tutorials/recipes/recipes/amp_recipe.html

### CV-Q35 断点续训应保存哪些状态？

专题：训练工程

模型、优化器、调度器、精度缩放器、步数和随机状态都可能必要。还要记录数据采样进度及配置，仅恢复权重通常不是严格续训。

延伸阅读：https://docs.pytorch.org/tutorials/recipes/recipes/amp_recipe.html

### CV-Q36 RGB与BGR不一致会产生什么影响？

专题：数据管线

颜色通道语义被置换，预训练归一化和卷积权重面对错误分布。应明确解码库、通道顺序、数值范围及归一化约定。

延伸阅读：https://docs.pytorch.org/docs/stable/data.html

### CV-Q37 Resize和letterbox对检测标签有什么影响？

专题：数据管线

直接resize按轴缩放，letterbox还引入填充偏移；框坐标必须应用同样变换。还原到原图时要逆变换并裁剪边界。

延伸阅读：https://docs.pytorch.org/docs/stable/data.html

### CV-Q38 分割掩码缩放为什么通常不用双线性？

专题：数据管线

离散类别ID不能线性混合，通常使用最近邻保留类别。概率图可采用连续插值，但与类别标签图是不同对象。

延伸阅读：https://docs.pytorch.org/docs/stable/data.html

### CV-Q39 为什么训练数据加载也要设置随机种子？

专题：数据管线

数据打乱、多进程worker及随机增强各自可能有随机源。只设置模型种子不足以完全控制输入序列，且跨硬件仍可能不完全复现。

延伸阅读：https://docs.pytorch.org/docs/stable/data.html

### CV-Q40 怎么判断训练瓶颈在数据还是GPU？

专题：数据管线

观察GPU利用率、批次等待及算子时间，分别测量数据加载和计算。用预取、缓存或并行加载前先定位瓶颈，避免盲目增worker。

延伸阅读：https://docs.pytorch.org/docs/stable/data.html

### CV-Q41 Mixup如何构造训练目标？

专题：视觉增强

用同一系数线性混合两张图与标签，鼓励更平滑的决策。检测和分割需适配目标定义，不能只混图片而不改标签。

延伸阅读：https://docs.pytorch.org/vision/stable/transforms.html

### CV-Q42 CutMix与Mixup有何不同？

专题：视觉增强

CutMix替换局部区域并按面积混合分类标签，保留局部纹理；遮挡区域与实际信息不总严格成比例，任务适用性需验证。

延伸阅读：https://docs.pytorch.org/vision/stable/transforms.html

### CV-Q43 随机裁剪为什么可能引入标签噪声？

专题：视觉增强

裁剪可能移除主体却保留原图类别。需结合目标大小、框约束或任务规则设计裁剪，不是增强越强越好。

延伸阅读：https://docs.pytorch.org/vision/stable/transforms.html

### CV-Q44 颜色增强何时会破坏语义？

专题：视觉增强

若类别依赖颜色，如交通信号或特定检测属性，强颜色扰动可能改变目标含义。增强范围应来自合理的成像变化。

延伸阅读：https://docs.pytorch.org/vision/stable/transforms.html

### CV-Q45 测试时增强如何正确汇总？

专题：视觉增强

对多个视图预测后对齐坐标或类别再融合，同时报告额外成本。不能用测试标签选择最有利的增强组合。

延伸阅读：https://docs.pytorch.org/vision/stable/transforms.html

### CV-Q46 一阶段与两阶段检测怎么区分？

专题：检测架构

两阶段先产生候选区域再分类回归，一阶段更直接地产生密集预测。精度与速度取决于具体设计和训练，不是绝对的快慢优劣。

延伸阅读：https://arxiv.org/abs/1506.01497

### CV-Q47 Anchor-based与Anchor-free分别预测什么？

专题：检测架构

前者围绕预设框学习偏移，后者常以点、中心或距离表示目标。标签分配仍然关键，anchor-free不意味着没有尺度与匹配设计。

延伸阅读：https://arxiv.org/abs/1506.01497

### CV-Q48 FPN为什么能帮助多尺度目标？

专题：检测架构

通过自顶向下路径与横向连接融合高层语义和不同分辨率特征。小目标需要空间细节，大目标需要上下文；融合方式和层分配影响结果。

延伸阅读：https://arxiv.org/abs/1506.01497

### CV-Q49 RoI Pooling与RoI Align的差别？

专题：检测架构

RoI Pooling的量化可能引入对齐误差；RoI Align以连续坐标采样和插值减少该误差。对像素级预测尤其重要。

延伸阅读：https://arxiv.org/abs/1506.01497

### CV-Q50 正负样本分配为什么会影响检测？

专题：检测架构

它决定哪些预测负责哪些真值，以及训练梯度的分布。分配过少可能漏监督，过多可能冲突；需结合框质量、类别和尺度。

延伸阅读：https://arxiv.org/abs/1506.01497

### CV-Q51 Focal loss在解决什么问题？

专题：检测损失与评估

对容易样本降低权重，使训练更关注难例；经典形式含调制因子(1−pt)^gamma。难例也可能是错标，不能把所有大损失都当有效信号。

延伸阅读：https://cocodataset.org/#detection-eval

### CV-Q52 IoU损失在框不相交时有什么困难？

专题：检测损失与评估

普通IoU在不相交区可能难提供有效位置梯度；广义或距离相关变体加入额外几何信息。不同变体的目标和稳定性需要比较。

延伸阅读：https://cocodataset.org/#detection-eval

### CV-Q53 AP50与AP75分别反映什么？

专题：检测损失与评估

它们在不同IoU匹配阈值下计算AP，较高阈值要求更精确定位。不能只报告较宽松阈值就声称全面提升定位能力。

延伸阅读：https://cocodataset.org/#detection-eval

### CV-Q54 小目标检测为什么困难？

专题：检测损失与评估

目标像素少，下采样后细节容易丢失，轻微定位误差也可能大幅改变IoU。可从分辨率、特征层、采样及标注质量入手。

延伸阅读：https://cocodataset.org/#detection-eval

### CV-Q55 DETR为什么使用二分图匹配？

专题：检测损失与评估

将固定数量预测与真值进行一对一匹配，使集合预测损失不依赖真值顺序，并抑制重复分配。具体训练配方决定收敛与小目标表现。

延伸阅读：https://cocodataset.org/#detection-eval

### CV-Q56 U-Net的跳跃连接传递什么？

专题：分割任务

把编码端高分辨率特征传给解码端，补充上采样过程中缺失的定位细节。与ResNet的逐元素残差不是同一种结构用途。

延伸阅读：https://arxiv.org/abs/1505.04597

### CV-Q57 语义分割的ignore label怎么处理？

专题：分割任务

训练损失与评估统计都应排除忽略像素，且归一化分母一致。把忽略值当普通类别会污染梯度和指标。

延伸阅读：https://arxiv.org/abs/1505.04597

### CV-Q58 边界质量差但区域IoU高如何解释？

专题：分割任务

大区域内部正确可掩盖细边界误差。可补充边界指标、细结构分群及可视化，判断是否满足实际使用需求。

延伸阅读：https://arxiv.org/abs/1505.04597

### CV-Q59 全景分割与实例分割有何不同？

专题：分割任务

全景分割统一覆盖可数实例和不可数背景区域，为每个像素提供类别及必要实例ID。需处理实例与背景预测冲突。

延伸阅读：https://arxiv.org/abs/1505.04597

### CV-Q60 SAM类提示式分割与固定类别分割有何不同？

专题：分割任务

提示式模型根据点、框等提示输出掩码，不自动等同于目标业务类别识别。无提示使用或语义分类需要额外设计与评估。

延伸阅读：https://arxiv.org/abs/1505.04597

### CV-Q61 Patch大小如何影响ViT计算？

专题：Transformer视觉细节

相同分辨率下，patch越小token越多，全局注意力计算和存储增长快。更细粒度可能保留细节，但增加预算需求。

延伸阅读：https://arxiv.org/abs/2010.11929

### CV-Q62 视觉位置编码为什么要适配分辨率？

专题：Transformer视觉细节

训练和推理网格变化时，固定长度位置参数可能不匹配。插值是一种方案，但要区分特殊token及二维网格结构。

延伸阅读：https://arxiv.org/abs/2010.11929

### CV-Q63 窗口注意力与全局注意力如何取舍？

专题：Transformer视觉细节

窗口内交互降低计算，但跨窗口信息传播受限；移位窗口或跨层融合可补充。局部化收益要结合长程关系需求。

延伸阅读：https://arxiv.org/abs/2010.11929

### CV-Q64 Pre-Norm与Post-Norm有什么区别？

专题：Transformer视觉细节

归一化分别放在子层前或残差相加后，改变梯度通路和训练稳定性。深度、学习率及最终归一化都会影响比较。

延伸阅读：https://arxiv.org/abs/2010.11929

### CV-Q65 多头注意力为什么要拆分不同头？

专题：Transformer视觉细节

各头在不同投影子空间计算关系，再合并输出，允许多种关系表示。头可能冗余，头数增加也会改变每头维度与计算效率。

延伸阅读：https://arxiv.org/abs/2010.11929

### CV-Q66 对比学习的正负样本怎样定义？

专题：自监督与视觉语言

通常把同一实例不同视图当正对、其他实例当负对，但语义相同的实例可能被误作负样本。构造方式决定学到的不变性。

延伸阅读：https://arxiv.org/abs/2103.00020

### CV-Q67 对比损失的温度参数影响什么？

专题：自监督与视觉语言

温度缩放相似度分布，较低温度使其更尖锐并强调难例。它会改变梯度，不能把更低温度简单理解为更好。

延伸阅读：https://arxiv.org/abs/2103.00020

### CV-Q68 CLIP如何进行零样本分类？

专题：自监督与视觉语言

把类别写成文本提示，比较图像与各文本嵌入相似度后选择类别。提示措辞、类别描述和域偏移都会影响结果。

延伸阅读：https://arxiv.org/abs/2103.00020

### CV-Q69 MAE为什么遮蔽大量patch？

专题：自监督与视觉语言

通过从可见区域重建被遮蔽内容学习表示，减少编码器处理的token。重建好不必然意味着所有下游任务都好，需独立评估。

延伸阅读：https://arxiv.org/abs/2103.00020

### CV-Q70 自监督中的表示坍塌是什么？

专题：自监督与视觉语言

不同输入得到几乎相同表示，模型失去区分能力。负样本、方差约束、停止梯度或结构不对称可在相应方法中防止坍塌。

延伸阅读：https://arxiv.org/abs/2103.00020

### CV-Q71 线性探测与全量微调分别衡量什么？

专题：迁移与泛化

线性探测固定骨干，只训练线性头，考察已有表示可分性；全量微调允许表示适应任务。两者预算和结论不同。

延伸阅读：https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html

### CV-Q72 域适应与域泛化怎么区分？

专题：迁移与泛化

域适应训练时通常可接触目标域数据，域泛化通常不使用目标域训练数据。比较时必须说明可用信息，避免不公平协议。

延伸阅读：https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html

### CV-Q73 测试时适应可能带来什么风险？

专题：迁移与泛化

利用测试流更新模型可能遇到错误积累、样本顺序依赖和分布突变。需规定可用数据、重置方式及是否有标签泄漏。

延伸阅读：https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html

### CV-Q74 开放集识别为什么不等于普通分类？

专题：迁移与泛化

测试中可能出现训练未见类别，系统需要拒识或识别未知。只在已知类间取最大概率不提供可靠未知检测。

延伸阅读：https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html

### CV-Q75 灾难性遗忘是什么？

专题：迁移与泛化

顺序学习新任务时，更新损害旧任务能力。可考虑回放、正则或结构扩展，评估要同时报告旧、新任务及存储预算。

延伸阅读：https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html

### CV-Q76 知识蒸馏的软目标提供什么？

专题：蒸馏与压缩

教师的类别分布可表达类别间相似关系；学生结合软目标与真实标签训练。教师错误也会传递，温度和权重需要验证。

延伸阅读：https://arxiv.org/abs/1503.02531

### CV-Q77 结构化剪枝与非结构化剪枝有何差别？

专题：蒸馏与压缩

前者去除通道等规则结构，较易利用普通硬件加速；后者置零单个权重，更依赖稀疏算子。参数少不等于延迟低。

延伸阅读：https://arxiv.org/abs/1503.02531

### CV-Q78 PTQ和QAT怎么区分？

专题：蒸馏与压缩

PTQ在训练后校准量化参数，QAT在训练中模拟量化误差。低比特、敏感层及校准数据覆盖会影响精度，需要部署实测。

延伸阅读：https://arxiv.org/abs/1503.02531

### CV-Q79 为什么量化校准数据必须有代表性？

专题：蒸馏与压缩

激活范围来自样本统计，偏窄或异常分布可能导致截断或分辨率浪费。需要覆盖真实场景并检查分层误差。

延伸阅读：https://arxiv.org/abs/1503.02531

### CV-Q80 FLOPs、参数量和实际延迟有什么区别？

专题：蒸馏与压缩

它们分别近似算术工作、存储规模和执行时间。内存访问、并行度、算子融合及batch都会影响延迟，应在目标硬件测试。

延伸阅读：https://arxiv.org/abs/1503.02531

### CV-Q81 模型导出后为什么需要数值对齐？

专题：视觉部署

导出可能改变算子实现、精度或形状处理。应比较代表性输入的中间及最终结果，并验证预处理和后处理一致。

延伸阅读：https://docs.pytorch.org/tutorials/advanced/super_resolution_with_onnxruntime.html

### CV-Q82 动态输入尺寸会增加什么部署复杂度？

专题：视觉部署

执行引擎需支持变化形状，内存规划和优化可能受影响。应测试边界尺寸、batch及性能，不能只用一个样例证明支持。

延伸阅读：https://docs.pytorch.org/tutorials/advanced/super_resolution_with_onnxruntime.html

### CV-Q83 流式视频推理为什么要关注队列积压？

专题：视觉部署

处理速度低于输入速度时延迟持续增长，即使单帧推理很快也会失效。需背压、丢帧策略或降采样，并明确时效性目标。

延伸阅读：https://docs.pytorch.org/tutorials/advanced/super_resolution_with_onnxruntime.html

### CV-Q84 视觉数据漂移如何分群监控？

专题：视觉部署

按设备、光照、天气、场景和目标尺度等分群检查输入与性能。总体均值可能掩盖少数场景严重退化，标签延迟需单独处理。

延伸阅读：https://docs.pytorch.org/tutorials/advanced/super_resolution_with_onnxruntime.html

### CV-Q85 怎么设计视觉模型的回归样例集？

专题：视觉部署

保留历史失败、边界条件和代表性场景，记录预期输出或指标容忍范围。避免只收集易例，并控制重复与训练污染。

延伸阅读：https://docs.pytorch.org/tutorials/advanced/super_resolution_with_onnxruntime.html

### CV-Q86 DDP为什么需要正确设置采样器？

专题：分布式与调试

每个进程应处理合适的数据分片，避免重复训练相同序列；跨epoch打乱需按约定更新采样器状态，尾部样本处理也影响统计。

延伸阅读：https://docs.pytorch.org/tutorials/intermediate/ddp_tutorial.html

### CV-Q87 分布式验证为什么不能直接平均各卡指标？

专题：分布式与调试

各卡样本数或类别分布可能不同，非线性指标的均值不等于全局指标。应汇总足够统计量或全部预测，再按定义计算。

延伸阅读：https://docs.pytorch.org/tutorials/intermediate/ddp_tutorial.html

### CV-Q88 显存泄漏与正常缓存怎么区分？

专题：分布式与调试

框架缓存分配不一定是泄漏；若每步保留带计算图的张量，活跃显存可能持续增长。检查引用、日志缓存和不必要的retain_graph。

延伸阅读：https://docs.pytorch.org/tutorials/intermediate/ddp_tutorial.html

### CV-Q89 损失突然NaN应按什么顺序排查？

专题：分布式与调试

检查输入标签和有限性、损失中的log除法、学习率与梯度、精度溢出，再定位首个异常算子。保存最小复现batch比盲目调参更有效。

延伸阅读：https://docs.pytorch.org/tutorials/intermediate/ddp_tutorial.html

### CV-Q90 训练可复现为什么不等于跨机器逐位一致？

专题：分布式与调试

随机源、并行归约、库版本和非确定算子可能改变数值。应记录环境并区分统计可复现与逐位一致，报告合理容差。

延伸阅读：https://docs.pytorch.org/tutorials/intermediate/ddp_tutorial.html

### CV-Q91 扩散模型训练在预测什么？

专题：前沿模型基础

常见去噪扩散训练从加噪样本预测噪声或等价参数化目标，再迭代去噪采样。不同参数化与噪声日程不能混为一个固定公式。

延伸阅读：https://arxiv.org/abs/2006.11239

### CV-Q92 Classifier-free guidance如何影响生成？

专题：前沿模型基础

组合有条件与无条件预测增强条件约束，较大引导可能提升条件贴合但降低多样性或产生伪影。效果依赖模型和采样设置。

延伸阅读：https://arxiv.org/abs/2006.11239

### CV-Q93 图像检索的embedding为何常做归一化？

专题：前沿模型基础

单位化后点积对应余弦相似度，使方向主导相似度。也会去掉范数信息，必须与训练损失和检索索引保持一致。

延伸阅读：https://arxiv.org/abs/2006.11239

### CV-Q94 目标跟踪为什么不能只逐帧检测？

专题：前沿模型基础

逐帧检测没有稳定身份，跟踪还需跨帧关联、运动与外观线索，处理遮挡和重现。检测好不代表ID切换少。

延伸阅读：https://arxiv.org/abs/2006.11239

### CV-Q95 如何回答视觉项目中的失败案例？

专题：前沿模型基础

选具体场景说明错误类型、证据、原因假设和修复验证，报告仍失败的边界。不要把所有问题归结为数据不够或模型不够大。

延伸阅读：https://arxiv.org/abs/2006.11239

### CV-Q96 自然扰动鲁棒性和对抗鲁棒性有何不同？

专题：视觉鲁棒性

前者针对模糊、噪声等常见退化，后者针对有意优化的扰动。一个方向表现好不保证另一个也好，威胁模型和强度需明确。

延伸阅读：https://arxiv.org/abs/1903.12261

### CV-Q97 模型为什么可能学习背景捷径？

专题：视觉鲁棒性

训练中背景与类别相关时，优化会利用容易信号。可通过背景替换、分群评估和反事实样例检查，热力图本身不能证明因果依赖。

延伸阅读：https://arxiv.org/abs/1903.12261

### CV-Q98 遮挡测试应该控制哪些因素？

专题：视觉鲁棒性

控制遮挡比例、位置、形状及是否覆盖主体，区分随机与最坏情况。对比必须使用相同扰动协议，不应挑有利样例。

延伸阅读：https://arxiv.org/abs/1903.12261

### CV-Q99 单目深度估计为什么可能存在尺度歧义？

专题：视觉鲁棒性

单张图像通常缺少确定绝对尺度的信息，多个三维场景可投影成相似图像。训练先验或额外传感信息可提供约束，评估需说明尺度对齐。

延伸阅读：https://arxiv.org/abs/1903.12261

### CV-Q100 关键点热图与直接坐标回归有什么取舍？

专题：视觉鲁棒性

热图保留空间分布但占内存且有量化影响，坐标回归紧凑但可能难表示多峰不确定性。分辨率与解码方法会影响定位精度。

延伸阅读：https://arxiv.org/abs/1903.12261

### CV-C01 两组框的 IoU 矩阵

使用 NumPy；boxes1:(N,4)、boxes2:(M,4)，均为连续坐标 xyxy。坐标有序，零面积允许；返回 (N,M)，union=0 时返回0；面积不加1。

验收示例：[[0,0,2,2]] 与 [[1,1,3,3]] → [[1/7]]。

```python
def box_iou(boxes1, boxes2):
    raise NotImplementedError("请实现")

```

### CV-C02 单类别 NMS

使用 NumPy 或标准库；框为 xyxy，scores 等长；按分数降序、同分原索引升序；抑制 IoU>threshold 的框，返回保留的原索引；空输入返回[]。

验收示例：两个相同框分数0.9/0.8，threshold=0.5 → [0]。

```python
def nms(boxes, scores, threshold=0.5):
    raise NotImplementedError("请实现")

```

### CV-C03 单通道二维卷积前向

使用 NumPy；输入 (H,W)、核 (kh,kw)，实现深度学习惯例的互相关，不翻转核。正整数 stride、非负整数 padding，零填充，输出尺寸向下取整；非法尺寸抛 ValueError。

验收示例：全1的3×3图与全1的2×2核 → 2×2全4。

```python
def conv2d(image, kernel, stride=1, padding=0):
    raise NotImplementedError("请实现")

```

### CV-C04 缩放点积注意力

使用 PyTorch；Q:(B,Lq,D)、K:(B,Lk,D)、V:(B,Lk,Dv)。布尔 mask 可广播到(B,Lq,Lk)，True表示允许；全屏蔽行输出全0。返回输出和注意力权重，禁止调用现成 attention。

验收示例：Q/K全0且未屏蔽 → 输出为V沿key维度的均值；全屏蔽行不得出现NaN。

```python
def attention(Q, K, V, mask=None):
    raise NotImplementedError("请实现")

```

### CV-C05 二值 Dice 指标

使用 NumPy；输入同形状布尔掩码，计算集合 Dice，不额外平滑；两个掩码都空时定义为1.0。

验收示例：[1,0,1]与[1,1,0] → 0.5；全0与全0 → 1.0。

```python
def dice_score(pred, target):
    raise NotImplementedError("请实现")

```

### CV-C06 最大池化前向

NumPy；单通道二维有限图像，正整数kernel_size/stride，无padding；尺寸按floor规则，核超出图像抛ValueError。返回池化矩阵。

验收示例：[[1,2],[3,4]]，kernel=2,stride=2 → [[4]]。

```python
def max_pool2d(image, kernel_size=2, stride=2):
    raise NotImplementedError("请实现")

```

### CV-C07 双线性采样单点

NumPy；非空二维浮点图像，0<=y<=H-1、0<=x<=W-1，超界ValueError；按相邻四点双线性插值，边缘使用有效端点。

验收示例：image=[[0,2],[4,6]],y=0.5,x=0.5 → 3。

```python
def bilinear_sample(image, y, x):
    raise NotImplementedError("请实现")

```

### CV-C08 检测框裁剪与过滤

NumPy；boxes:(N,4)，xyxy；将x裁剪到[0,width]、y到[0,height]，width,height>0；删除裁剪后宽或高<=0的框，返回剩余框及原索引。

验收示例：[[-1,0,2,2],[3,0,4,1]],width=2,height=2 → [[0,0,2,2]]及[0]。

```python
def clip_boxes(boxes, width, height):
    raise NotImplementedError("请实现")

```

### CV-C09 检测框格式转换

NumPy；非负w,h的(N,4)中心格式cx,cy,w,h，转换为xyxy，允许负坐标，不做裁剪，返回新数组。

验收示例：[[2,3,4,2]] → [[0,2,4,4]]。

```python
def cxcywh_to_xyxy(boxes):
    raise NotImplementedError("请实现")

```

### CV-C10 按类别执行NMS

NumPy或标准库；boxes为xyxy，scores和整数labels等长；同类内IoU>threshold抑制，不同类互不抑制。最终返回索引按分数降序、同分索引升序。

验收示例：两个相同框labels=[0,1]、scores=[0.9,0.8] → [0,1]。

```python
def classwise_nms(boxes, scores, labels, threshold=0.5):
    raise NotImplementedError("请实现")

```

### CV-C11 分割mIoU

NumPy；同形状整数pred,target，合法类别0..C-1，target可含ignore_index。忽略相应像素；逐类union为0的类别不参与均值，全部忽略返回0。返回各类IoU（缺席为None）及均值。

验收示例：pred=[0,1],target=[0,0],C=2 → [0.5,0.0]，均值0.25。

```python
def segmentation_miou(pred, target, num_classes, ignore_index=-1):
    raise NotImplementedError("请实现")

```

### CV-C12 多类Focal loss

PyTorch；logits:(N,C)、整数target:(N,)，N,C>0；无类别权重，gamma>=0，计算mean(-(1-pt)**gamma*log(pt))，使用稳定log_softmax。

验收示例：全0的1×2 logits，gamma=0 → log(2)，与交叉熵一致。

```python
def focal_loss(logits, target, gamma=2.0):
    raise NotImplementedError("请实现")

```

### CV-C13 Label smoothing交叉熵

PyTorch；logits:(N,C)、target:(N,)，N,C>0，0<=smoothing<1。目标分布=(1-s)*one_hot+s/C；返回平均交叉熵，不调用现成label_smoothing参数。

验收示例：1×2全0 logits，任意合法smoothing → log(2)。

```python
def smoothed_cross_entropy(logits, target, smoothing=0.1):
    raise NotImplementedError("请实现")

```

### CV-C14 LayerNorm前向

NumPy；x任意维且末维D>0，gamma/beta为(D,)。沿末维使用总体方差，eps>0，返回归一化后仿射结果。

验收示例：x=[[2,2]],gamma=[1,1],beta=[0,0] → [[0,0]]。

```python
def layer_norm(x, gamma, beta, eps=1e-5):
    raise NotImplementedError("请实现")

```

### CV-C15 图像Patch化

NumPy；image:(H,W,C)，正整数patch_size且整除H/W；按行优先遍历patch，每个patch按(h,w,c)展平，返回(H/p*W/p,p*p*C)。

验收示例：H=W=2,C=1,p=1，图像按行是1,2,3,4 → [[1],[2],[3],[4]]。

```python
def patchify(image, patch_size):
    raise NotImplementedError("请实现")

```

### CV-C16 四连通区域标记

标准库或NumPy；二维0/1掩码，背景0；按行优先扫描新区域，前景四连通分量编号从1开始。返回标签矩阵及区域数，空输入允许。

验收示例：[[1,0],[0,1]] → [[1,0],[0,2]]，区域数2。

```python
def connected_components(mask):
    raise NotImplementedError("请实现")

```

### CV-C17 二值膨胀

NumPy；二维布尔掩码，正奇数kernel_size，方形核全部有效；边界外为False，输出同形状且不修改输入。

验收示例：3×3图仅中心为True，kernel=3 → 全True。

```python
def binary_dilation(mask, kernel_size=3):
    raise NotImplementedError("请实现")

```

### CV-C18 热图关键点解码

NumPy；heatmaps:(K,H,W)，H/W>0。每张热图取最大点，平局按行优先；返回(K,2)的(x,y)整数坐标及(K,)分数。

验收示例：单热图[[0,2],[1,0]] → 坐标[[1,0]]，分数[2]。

```python
def decode_heatmaps(heatmaps):
    raise NotImplementedError("请实现")

```

### CV-C19 水平翻转图像与框

NumPy；image:(H,W,C)，boxes:(N,4)合法连续xyxy且在图内。翻转宽度轴并将框x区间变为[W-x2,W-x1]，返回副本，不加减1。

验收示例：W=10，框[1,2,4,5] → [6,2,9,5]。连续框坐标与像素索引规则不同。

```python
def horizontal_flip(image, boxes):
    raise NotImplementedError("请实现")

```

### CV-C20 教师学生KL蒸馏

PyTorch；学生和教师logits同形状(N,C)，N,C>0，T>0。返回T²乘平均KL(teacher||student)，教师概率detach；不混真实标签损失。

验收示例：两者完全相同 → 约0；反传只有学生有梯度。

```python
def distillation_loss(student_logits, teacher_logits, temperature=2.0):
    raise NotImplementedError("请实现")

```

## Agent Harness

### AH-Q01 Agent Harness 指什么？

这里指模型外围的执行系统：消息与上下文、工具调度、状态持久化、权限、预算和评测。模型决定或建议动作，harness 负责受约束地执行；行业边界并不完全统一。

追问：替换模型后哪些逻辑应保持不变？

延伸阅读：https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

### AH-Q02 Workflow 与 Agent 怎么选？

流程固定、可预测时优先明确工作流；需要动态选择步骤时再引入模型决策。自主程度增加后要补停止条件、观察和评估，不能只看演示效果。

追问：哪些任务用普通函数调用就足够？

延伸阅读：https://www.anthropic.com/engineering/building-effective-agents

### AH-Q03 一个最小 Agent loop 包含什么？

接收任务和状态，调用模型，校验动作，执行允许的工具，记录结果，再决定继续或结束。显式限制轮数、时间和成本；异常也要形成可恢复状态。

追问：模型持续要求同一个失败工具时如何处理？

延伸阅读：https://www.anthropic.com/engineering/building-effective-agents

### AH-Q04 工具 schema 能保证安全吗？

schema 只约束结构。仍需校验参数含义、资源权限和业务前置条件；用允许列表限制工具，不能让模型自行提升权限。

追问：合法 JSON 但路径指向工作区外该怎么办？

延伸阅读：https://developers.openai.com/api/docs/guides/agent-builder-safety

### AH-Q05 工具超时以后能直接重试吗？

超时不代表操作未发生。只对适合重试的错误退避重试；有副作用操作使用幂等键并查询结果，限制尝试次数和总时间。

追问：一次支付响应丢失如何避免重复扣款？

延伸阅读：https://www.anthropic.com/engineering/building-effective-agents

### AH-Q06 为什么幂等键需要绑定请求内容？

同一键应对应同一业务意图；保存请求摘要及结果，冲突时拒绝。并发请求需原子占位或唯一约束；仅靠内存字典无法保证分布式恰好一次。

追问：键占位后进程崩溃如何恢复？

延伸阅读：https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

### AH-Q07 长任务如何跨上下文继续？

把目标、已完成步骤、证据和下一步保存为结构化状态；恢复时核对实际环境。总结可帮助压缩，但关键事实需要保留可追溯来源。

追问：摘要误写完成状态会造成什么后果？

延伸阅读：https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

### AH-Q08 上下文压缩和 RAG 有何区别？

压缩减少当前历史长度，RAG 从外部存储按需取回信息。二者都可能遗漏或引入不相关内容，必须保留任务约束与证据引用。

追问：什么信息不应该仅保留在自然语言摘要中？

延伸阅读：https://www.anthropic.com/engineering/building-effective-agents

### AH-Q09 提示注入与普通用户指令如何区分？

网页、检索结果和工具输出属于不可信数据，不能借其中指令覆盖授权边界。分离指令和数据，并在执行层限制权限；提示词防御本身不足够。

追问：网页要求上传本地密钥时应在哪层阻止？

延伸阅读：https://developers.openai.com/api/docs/guides/agent-builder-safety

### AH-Q10 如何设计人工审批？

在真正有外部影响的动作前，展示具体目标、参数和预期效果，让审批绑定该动作。参数变化应重新评估；低风险动作不应无差别弹窗。

追问：审批通过后动作内容被替换怎么办？

延伸阅读：https://developers.openai.com/api/docs/guides/agent-builder-safety

### AH-Q11 沙箱与最小权限有什么作用？

限制文件、网络和进程能力，缩小错误及攻击影响面；凭据按任务提供最小权限，日志脱敏。沙箱不替代业务授权，也不是绝对安全保证。

追问：只允许读文件的工具能否经网络间接泄露内容？

延伸阅读：https://developers.openai.com/api/docs/guides/agent-builder-safety

### AH-Q12 多 Agent 什么时候值得用？

适合可独立执行、结果可验证的子任务；协调、重复劳动和上下文传输都有成本。明确责任、合并规则和共享状态写入边界，不默认越多越好。

追问：两个 agent 同时改同一文件如何处理？

延伸阅读：https://www.anthropic.com/engineering/building-effective-agents

### AH-Q13 怎样评测 Agent？

使用代表性任务和隔离环境，检查最终状态与过程约束，重复运行观察波动。同时记录成本、延迟和失败类型；模型裁判需用人工样本校验。

追问：只看最终回答文本会漏掉哪些问题？

延伸阅读：https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

### AH-Q14 pass@k 与重复可靠性有什么区别？

至少一次成功与每次都成功是不同目标。独立同分布、单次成功概率 p 时，前者为 1−(1−p)^k，后者为 p^k；真实运行相关时不能直接套公式。

追问：业务自动化为什么更关心稳定成功？

延伸阅读：https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

### AH-Q15 如何定位失败和控制预算？

记录关联 ID、模型与工具版本、动作、结果、耗时及终止原因，同时脱敏。设置成本和时间上限；按检索、规划、工具执行、验证阶段分类失败，再做回归测试。

追问：模型返回成功但环境没改变应算哪类失败？

延伸阅读：https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

### AH-Q16 为什么Agent执行最好有显式状态？

专题：执行状态机

明确待执行、执行中、成功、失败及取消状态，能检查合法转换并定位中断点。只有自然语言历史时，恢复和并发约束更难可靠实现。

延伸阅读：https://www.anthropic.com/engineering/building-effective-agents

### AH-Q17 计划与执行结果为什么要分开记录？

专题：执行状态机

计划是意图，结果是环境证据。模型声称完成不代表工具成功，应记录动作参数、返回状态及验证结果，避免把建议当事实。

延伸阅读：https://www.anthropic.com/engineering/building-effective-agents

### AH-Q18 终止条件怎样避免无限循环？

专题：执行状态机

同时设置成功判据、步数、时间及预算上限，并检测重复无进展动作。达到上限应返回未完成状态和证据，不能伪装成功。

延伸阅读：https://www.anthropic.com/engineering/building-effective-agents

### AH-Q19 工具返回空值时应如何处理？

专题：执行状态机

区分合法空结果、协议错误和执行失败，结构化返回状态及错误类型。把所有空值当失败会错误重试，全部当成功又会掩盖问题。

延伸阅读：https://www.anthropic.com/engineering/building-effective-agents

### AH-Q20 工具调用之间何时可以并行？

专题：执行状态机

仅当数据依赖和副作用冲突允许时并行。读取同一稳定资源通常较安全，写入同一状态需排序或事务；模型说独立还需执行层判断。

延伸阅读：https://www.anthropic.com/engineering/building-effective-agents

### AH-Q21 工具名称和描述怎样减少误用？

专题：工具契约

用明确动词说明作用、前置条件、参数单位及副作用，区分相似工具。描述应帮助选择，但不能代替服务端校验。

延伸阅读：https://json-schema.org/understanding-json-schema/

### AH-Q22 JSON Schema中的required与nullable有什么不同？

专题：工具契约

required约束字段是否存在，nullable或包含null的类型约束其值能否为空。字段缺失和显式null可能有不同业务语义。

延伸阅读：https://json-schema.org/understanding-json-schema/

### AH-Q23 严格结构化输出能保证事实正确吗？

专题：工具契约

不能，它最多保证一定格式约束。语义、权限、事实和业务一致性仍需检查，格式合法的虚构资源ID仍然无效。

延伸阅读：https://json-schema.org/understanding-json-schema/

### AH-Q24 为什么工具返回也需要schema？

专题：工具契约

稳定的返回结构让模型和执行器能区分结果、警告、分页与错误，支持版本演进。自由文本错误容易被误当作正常内容。

延伸阅读：https://json-schema.org/understanding-json-schema/

### AH-Q25 工具版本升级怎样保持兼容？

专题：工具契约

显式记录版本，优先兼容增加可选字段；破坏性变更需迁移或新版本。历史轨迹回放应绑定旧契约，不能静默改变参数含义。

延伸阅读：https://json-schema.org/understanding-json-schema/

### AH-Q26 退避为什么还需要jitter？

专题：失败与重试

大量客户端同时失败时，固定退避会让重试同步到达。加入随机扰动可分散流量，但仍需总次数、总时间和服务器限流约束。

延伸阅读：https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/

### AH-Q27 哪些错误通常不该自动重试？

专题：失败与重试

权限不足、参数无效和确定性业务拒绝通常需要修正而非重放。瞬时网络错误也要考虑操作是否已生效，不能只按HTTP代码机械判断。

延伸阅读：https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/

### AH-Q28 熔断器和重试有什么不同？

专题：失败与重试

重试尝试恢复单次请求；熔断在持续故障时暂时阻止新请求，减少级联负载。需要半开探测和恢复策略，避免永久封死服务。

延伸阅读：https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/

### AH-Q29 超时预算如何在多层调用中传播？

专题：失败与重试

传递统一截止时间，各层使用剩余时间而不是重新获得完整超时。否则嵌套重试可能远超用户预算，还应为清理留余量。

延伸阅读：https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/

### AH-Q30 重试风暴如何发生？

专题：失败与重试

多层各自重试使调用数相乘，失败服务承受更大压力。集中控制重试层、总预算和并发，并尊重服务端退避信号。

延伸阅读：https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/

### AH-Q31 至少一次投递意味着什么？

专题：幂等与事务

消息可能重复，需要消费者去重或幂等处理。它不是至少一次成功业务执行，重试和死信处理仍需定义。

延伸阅读：https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/

### AH-Q32 为什么分布式系统很难承诺端到端恰好一次？

专题：幂等与事务

消息、数据库和外部副作用跨不同故障域，确认丢失可造成不确定结果。局部事务或去重不自动覆盖所有边界，应明确保证范围。

延伸阅读：https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/

### AH-Q33 幂等记录什么时候可以过期？

专题：幂等与事务

过期策略要覆盖最大重试和重放窗口；过早删除可能重复执行，永久保存又有成本。还要区分相同键是否允许用于新意图。

延伸阅读：https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/

### AH-Q34 补偿操作与数据库回滚有什么不同？

专题：幂等与事务

补偿是新的业务动作，尝试抵消已发生影响，可能不完全恢复原状且也会失败。数据库回滚只覆盖相应事务边界内的修改。

延伸阅读：https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/

### AH-Q35 Outbox模式解决什么一致性问题？

专题：幂等与事务

把业务修改与待发送事件写入同一事务，再异步投递，避免数据库成功而消息丢失。消费者仍需处理重复，不能因此假定全链路恰好一次。

延伸阅读：https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/

### AH-Q36 检查点应该放在动作前还是动作后？

专题：持久化与恢复

通常先记录意图及唯一标识，再记录结果；恢复时核对执行状态。只在动作后保存会留下已执行但未记录的窗口。

延伸阅读：https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

### AH-Q37 恢复执行前为什么要重新观察环境？

专题：持久化与恢复

外部文件、任务或权限可能已变化，旧状态只反映过去。核对关键版本和结果可避免重复或建立在失效前提上的动作。

延伸阅读：https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

### AH-Q38 事件日志与状态快照有什么取舍？

专题：持久化与恢复

事件日志可追溯变化但重放成本增长；快照恢复快但需要一致性和版本。可结合快照与之后事件，并校验序列。

延伸阅读：https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

### AH-Q39 任务状态的schema变更怎么迁移？

专题：持久化与恢复

为状态标记版本，提供显式迁移与校验，保留失败时恢复路径。不能直接让新代码把旧字段按新含义解释。

延伸阅读：https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

### AH-Q40 取消任务时正在执行的工具怎么办？

专题：持久化与恢复

传播取消信号并记录已生效副作用；不支持取消的工具可能继续完成。最终状态应区分已取消、部分完成和结果未知。

延伸阅读：https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

### AH-Q41 上下文窗口很大为何仍需要选择信息？

专题：上下文管理

成本、延迟和干扰仍会增加，关键信息也可能难被利用。优先保留约束、当前状态和证据，按需检索细节而非无限堆积。

延伸阅读：https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

### AH-Q42 长期记忆应区分哪些类型？

专题：上下文管理

稳定偏好、事实、任务状态与推测应分开存储，并附来源和时间。推测不应自动升级为事实，敏感信息要有保留边界。

延伸阅读：https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

### AH-Q43 记忆更新为什么需要冲突处理？

专题：上下文管理

新信息可能纠正旧信息，也可能来自不可信来源。保存版本与来源，按权威性和时效性处理，避免简单最后写入获胜。

延伸阅读：https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

### AH-Q44 摘要压缩如何验证没有丢掉关键约束？

专题：上下文管理

对照结构化约束清单检查目标、禁止动作、审批和未完成项；保留原始证据指针。摘要看起来流畅不代表语义完整。

延伸阅读：https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

### AH-Q45 上下文里的工具结果太大怎么处理？

专题：上下文管理

返回摘要、分页和可检索引用，保留总数及截断标记。截断不得让模型误以为已读取全部内容，必要时支持定向继续读取。

延伸阅读：https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

### AH-Q46 RAG中的chunk大小有什么取舍？

专题：检索系统

小块定位精确但可能缺上下文，大块语义完整但噪声和成本高。按文档结构切分并保留父级信息，用任务评测选择。

延伸阅读：https://arxiv.org/abs/2005.11401

### AH-Q47 混合检索为什么可能优于纯向量检索？

专题：检索系统

关键词检索擅长精确名称、编号，向量检索擅长语义近似。融合需处理分数尺度和重复结果，不能只把列表简单拼接。

延伸阅读：https://arxiv.org/abs/2005.11401

### AH-Q48 Reranker与embedding检索各做什么？

专题：检索系统

初检以较低成本召回候选，重排对较小候选集做更细相关性判断。重排不能找回初检完全漏掉的文档。

延伸阅读：https://arxiv.org/abs/2005.11401

### AH-Q49 检索答案如何保持引用可追溯？

专题：检索系统

保存文档版本、片段位置和检索时间，让答案对应具体证据。引用存在不代表支持论断，还需核对内容是否真正蕴含答案。

延伸阅读：https://arxiv.org/abs/2005.11401

### AH-Q50 为什么检索必须在服务端过滤权限？

专题：检索系统

先把无权内容给模型再要求它别说出来已经泄露。权限过滤应在返回内容前完成，并考虑缓存和索引中的租户隔离。

延伸阅读：https://arxiv.org/abs/2005.11401

### AH-Q51 间接提示注入与直接提示注入有什么区别？

专题：安全边界

直接来自对话输入，间接来自网页、文档或工具结果等外部内容。两者都不能绕过授权；外部数据应保持低信任级别。

延伸阅读：https://developers.openai.com/api/docs/guides/agent-builder-safety

### AH-Q52 工具输出里的“系统消息”应该如何解释？

专题：安全边界

它仍是工具数据，不因文本自称系统或管理员而获得权限。执行层必须依据真实消息来源与授权判断，不能只匹配措辞。

延伸阅读：https://developers.openai.com/api/docs/guides/agent-builder-safety

### AH-Q53 路径校验为什么不能只检查字符串前缀？

专题：安全边界

相似目录名前缀、相对路径、符号链接和编码可能绕过。应规范化并验证实际目标归属，还要考虑检查后使用前的竞争变化。

延伸阅读：https://developers.openai.com/api/docs/guides/agent-builder-safety

### AH-Q54 凭据应该传给模型吗？

专题：安全边界

通常由执行器按最小权限注入工具，避免写进提示、日志或持久记忆。模型需要知道能力与结果，不需要看到原始密钥。

延伸阅读：https://developers.openai.com/api/docs/guides/agent-builder-safety

### AH-Q55 工具返回可执行代码时能否直接运行？

专题：安全边界

应按不可信内容处理，校验用途并限制执行环境。代码看似来自可信网站也不自动获得本地执行授权，需检查依赖及副作用。

延伸阅读：https://developers.openai.com/api/docs/guides/agent-builder-safety

### AH-Q56 认证与授权有什么区别？

专题：授权与治理

认证确认身份，授权决定该身份能对什么资源做什么。登录成功不意味着可执行任意工具动作，资源级权限仍需检查。

延伸阅读：https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization

### AH-Q57 OAuth scope应该怎样映射工具能力？

专题：授权与治理

scope给出被授予的能力范围，工具调用还需绑定用户、资源与业务条件。不能把某个广泛scope当作所有后续动作的无限授权。

延伸阅读：https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization

### AH-Q58 审批票据怎样防止被重用到别的动作？

专题：授权与治理

绑定动作摘要、目标、参数、身份和有效期，并在执行前校验。参数改变或票据过期应重新判断，不能只保存一个approved布尔值。

延伸阅读：https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization

### AH-Q59 自动化系统如何处理权限撤销？

专题：授权与治理

每次敏感执行重新校验有效权限或使用短期凭据，缓存授权需有失效机制。任务开始时有权限不代表结束时仍有权限。

延伸阅读：https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization

### AH-Q60 为什么审计日志不应保存全部原始内容？

专题：授权与治理

原始请求可能含敏感信息。记录足够的身份、动作、结果与关联标识，同时脱敏和控制保留期；可审计与最小收集需要平衡。

延伸阅读：https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization

### AH-Q61 MCP中的host、client、server各负责什么？

专题：协议与集成

host承载应用与用户交互，client维护与server的协议连接，server暴露工具或资源等能力。该分工不等同于一个统一的Agent规划器。

延伸阅读：https://modelcontextprotocol.io/specification/2025-06-18/architecture

### AH-Q62 MCP能自动解决工具授权吗？

专题：协议与集成

不能。协议和相应授权机制提供集成基础，应用仍需实施用户权限、审批和资源隔离。具体能力应以协商的协议版本为准。

延伸阅读：https://modelcontextprotocol.io/specification/2025-06-18/architecture

### AH-Q63 工具与资源在集成上有什么差别？

专题：协议与集成

工具通常表示可调用操作，资源表示可读取的上下文内容；具体控制方式依协议。读取资源也可能涉及敏感数据，不能默认无风险。

延伸阅读：https://modelcontextprotocol.io/specification/2025-06-18/architecture

### AH-Q64 协议初始化为什么要协商能力？

专题：协议与集成

双方版本和可选能力可能不同，协商避免调用未支持功能。客户端应有降级或明确错误，而不是假设所有服务能力一致。

延伸阅读：https://modelcontextprotocol.io/specification/2025-06-18/architecture

### AH-Q65 远程工具断开连接后如何恢复？

专题：协议与集成

先重建连接与能力状态，再查询未完成操作结果。不能简单重发所有历史请求，有副作用调用必须结合幂等和状态核对。

延伸阅读：https://modelcontextprotocol.io/specification/2025-06-18/architecture

### AH-Q66 异步并发与多线程并行有什么区别？

专题：并发与调度

异步适合等待I/O时让出执行，线程或进程可提供不同形式并行。CPU密集任务、阻塞库及共享状态决定选择，async语法本身不加速计算。

延伸阅读：https://docs.python.org/3/library/asyncio-task.html

### AH-Q67 如何限制Agent的工具并发数？

专题：并发与调度

用信号量或调度队列限制同时执行量，并设置每用户及全局配额。只限制单任务可能仍被大量任务压垮。

延伸阅读：https://docs.python.org/3/library/asyncio-task.html

### AH-Q68 背压为什么比无限排队更好？

专题：并发与调度

无限队列会把过载变成内存增长和长尾延迟；背压让上游减速或明确拒绝。需定义优先级、超时和丢弃策略。

延伸阅读：https://docs.python.org/3/library/asyncio-task.html

### AH-Q69 并发写同一文件怎样避免覆盖？

专题：并发与调度

可使用单写者、锁或版本比较与交换，并在合并前检查冲突。锁文件名存在不等于可靠锁，还需处理持有者崩溃。

延伸阅读：https://docs.python.org/3/library/asyncio-task.html

### AH-Q70 如何避免一个长任务饿死其他任务？

专题：并发与调度

采用配额、公平队列或分时执行，限制连续资源占用。优先级要结合业务目标，并监控等待时间而不只看吞吐。

延伸阅读：https://docs.python.org/3/library/asyncio-task.html

### AH-Q71 Trace、span与日志各有什么用途？

专题：观测与调试

trace表示跨组件请求链，span表示其中一个操作，日志记录事件细节。通过关联ID连接，才能从一次任务定位模型与工具耗时。

延伸阅读：https://opentelemetry.io/docs/concepts/signals/traces/

### AH-Q72 为什么应记录终止原因而非只有成功标记？

专题：观测与调试

预算耗尽、用户取消、工具拒绝和验证失败需要不同修复。单一失败布尔值无法解释可靠性退化，应使用稳定分类。

延伸阅读：https://opentelemetry.io/docs/concepts/signals/traces/

### AH-Q73 如何重放一次Agent失败？

专题：观测与调试

保存输入、版本、工具契约与可重放结果，用隔离环境或录制结果重现。真实外部副作用不应在调试中无条件再次执行。

延伸阅读：https://opentelemetry.io/docs/concepts/signals/traces/

### AH-Q74 日志里的token成本为什么要区分估计与结算？

专题：观测与调试

预估可能与服务端计量不同，缓存、重试和输出量也会影响。应记录口径及来源，避免把估算当账单事实。

延伸阅读：https://opentelemetry.io/docs/concepts/signals/traces/

### AH-Q75 如何定位延迟主要来自模型还是工具？

专题：观测与调试

对每个模型请求、排队和工具span分段计时，分析关键路径而非简单相加并行耗时。优先优化占比高且可控的环节。

延伸阅读：https://opentelemetry.io/docs/concepts/signals/traces/

### AH-Q76 任务成功率的分母应该包括哪些运行？

专题：评测设计

应预先定义是否包含超时、取消和基础设施失败，并分别报告。只统计完成运行会高估可靠性，排除项需要透明说明。

延伸阅读：https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

### AH-Q77 为什么Agent评测需要多次重复？

专题：评测设计

模型采样与环境噪声会导致同题结果变化，单次运行不稳定。报告重复次数、聚合方法及区间，并控制工具环境。

延伸阅读：https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

### AH-Q78 模型裁判有哪些常见偏差？

专题：评测设计

可能偏好长度、位置或熟悉的措辞，也可能漏掉环境副作用。用人工标注校验、一致性测试和明确准则约束，不将裁判输出视作真值。

延伸阅读：https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

### AH-Q79 如何避免评测集被迭代过拟合？

专题：评测设计

把开发集和保留集分开，记录反复查看与调整过程，定期补充真实失败。仅在固定公开样例上不断优化不代表泛化提升。

延伸阅读：https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

### AH-Q80 结果正确但违反过程约束算成功吗？

专题：评测设计

若任务要求权限、成本或不泄露数据等约束，违反就是失败或部分失败。结果指标和过程合规应分别记录，不能互相抵消。

延伸阅读：https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

### AH-Q81 工具mock测试不能发现什么？

专题：测试层次

它能验证调度逻辑，但发现不了真实权限、网络协议和环境副作用。需要补充契约测试及受控集成测试，明确覆盖边界。

延伸阅读：https://docs.python.org/3/library/unittest.mock.html

### AH-Q82 Golden trace测试何时容易过脆？

专题：测试层次

模型可通过多条合法路径完成任务，强制逐步一致会误报。应优先校验不变量和结果，对必须固定的协议步骤才做精确匹配。

延伸阅读：https://docs.python.org/3/library/unittest.mock.html

### AH-Q83 Agent测试中的不变量有哪些例子？

专题：测试层次

未审批不执行敏感写入、预算不为负、任务只有合法终态、重复幂等请求不重复生效。不变量应在执行层可观测验证。

延伸阅读：https://docs.python.org/3/library/unittest.mock.html

### AH-Q84 如何做故障注入测试？

专题：测试层次

模拟超时、部分响应、连接断开和执行后确认丢失，检查恢复行为。副作用测试应在隔离环境，避免故障演练影响真实用户。

延伸阅读：https://docs.python.org/3/library/unittest.mock.html

### AH-Q85 回归集如何覆盖安全问题？

专题：测试层次

加入不可信文档指令、越权资源、异常参数及重复调用等场景，检查执行边界。不要只测试模型是否口头拒绝，还要检查实际动作。

延伸阅读：https://docs.python.org/3/library/unittest.mock.html

### AH-Q86 模型路由怎样平衡成本与质量？

专题：性能与成本

简单任务用较低成本模型，困难或失败时升级；路由依据需评测。升级本身增加延迟，不能只比较单次模型价格。

延伸阅读：https://www.anthropic.com/engineering/building-effective-agents

### AH-Q87 缓存模型或工具结果有哪些前提？

专题：性能与成本

键应包含相关输入、模型或工具版本、权限与数据版本。动态内容和有副作用操作不能随意缓存，跨用户缓存尤其需隔离。

延伸阅读：https://www.anthropic.com/engineering/building-effective-agents

### AH-Q88 流式输出会降低总耗时吗？

专题：性能与成本

它常降低用户看到首段内容的等待，但不一定缩短完整任务时间。展示部分输出前还需考虑后续校验和错误撤回。

延伸阅读：https://www.anthropic.com/engineering/building-effective-agents

### AH-Q89 投机执行什么时候会浪费更多成本？

专题：性能与成本

提前执行可能用到的分支可降延迟，但预测错误会浪费资源；有副作用分支还可能不安全。只适合可取消、可隔离或只读任务。

延伸阅读：https://www.anthropic.com/engineering/building-effective-agents

### AH-Q90 为什么要同时报告成功率和单位成功成本？

专题：性能与成本

廉价但频繁失败的系统可能需要多次尝试，真实成功成本反而高。还要报告尾部成本，避免均值掩盖失控长任务。

延伸阅读：https://www.anthropic.com/engineering/building-effective-agents

### AH-Q91 多租户Agent平台如何隔离状态？

专题：生产设计

任务、存储、缓存和工具凭据都绑定租户与身份，在访问层强制校验。只在提示里写租户名不能形成隔离。

延伸阅读：https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

### AH-Q92 Prompt版本发布为什么需要回滚？

专题：生产设计

提示变化会改变工具选择、格式和成功率，影响类似代码变更。记录版本，做回归与灰度，并保留可恢复的旧配置。

延伸阅读：https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

### AH-Q93 人工接管时应提供什么信息？

专题：生产设计

展示目标、当前状态、已生效动作、失败证据和可选下一步，避免让人重读完整日志。接管后的权限和所有权也应明确。

延伸阅读：https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

### AH-Q94 如何回答“设计一个代码Agent系统”？

专题：生产设计

先澄清仓库权限、任务范围和成功判据，再设计隔离执行、工具、检查点、测试与审查。补充资源预算、恢复和回滚，不只画模型调用箭头。

延伸阅读：https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

### AH-Q95 如何讲述Harness项目的技术贡献？

专题：生产设计

用具体失败说明设计决策，量化成功率、恢复能力、延迟及成本变化，并交代评测条件。区分自己实现的系统逻辑与模型本身的能力。

延伸阅读：https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

### AH-Q96 什么时候Agent应该主动澄清？

专题：人机交互

当缺失信息会导致显著不同结果、越权或不可逆动作时澄清；低风险可逆选择可说明假设继续。不能把每个实现细节都推给用户。

延伸阅读：https://www.anthropic.com/engineering/building-effective-agents

### AH-Q97 进度更新应该包含什么？

专题：人机交互

报告已证实的结果、当前阻塞和需要的决定，而不是逐条播报工具调用。未验证完成的步骤应标为进行中或待验证。

延伸阅读：https://www.anthropic.com/engineering/building-effective-agents

### AH-Q98 用户中途修改需求如何处理？

专题：人机交互

比较新旧目标，保留仍有效状态，停止不再授权的后续动作并重新规划。已经发生的副作用需要明确告知，不能假装撤销。

延伸阅读：https://www.anthropic.com/engineering/building-effective-agents

### AH-Q99 如何防止“完成幻觉”？

专题：人机交互

把完成状态绑定可检查的环境证据与验收条件，失败或未知返回显式状态。自然语言总结必须由这些结果支撑，不能仅信模型自评。

延伸阅读：https://www.anthropic.com/engineering/building-effective-agents

### AH-Q100 为什么应让用户区分预览和实际执行？

专题：人机交互

预览描述将要做什么，执行会改变环境；界面和状态应明确区分。尤其发送、发布和删除等动作，不能把预览成功当执行成功。

延伸阅读：https://www.anthropic.com/engineering/building-effective-agents

### AH-C01 带轮数限制的 Agent loop

仅用标准库和模拟回调。model(history)返回 {type:"final",text:...} 或 {type:"tool",name:...,args:{...}}。工具必须在tools允许列表；最多调用模型max_steps次；返回含status和history的字典，状态为completed/limit/error。所有动作和工具结果留痕，错误不自动重试。不得接真实服务。

验收示例：模型先调用add(a=1,b=2)再final → completed；始终请求工具且max_steps=2 → limit。

```python
def run_agent(model, tools, history, max_steps=5):
    raise NotImplementedError("请实现")

```

### AH-C02 有上限的重试

标准库；fn()模拟调用，只对retryable元组内异常重试；max_attempts包含首次，必须>=1；第i次失败后等待min(cap,base*2**i)，i从0开始。注入sleep以避免真实等待，最终失败原样抛出。

验收示例：前两次TimeoutError第三次成功 → 调用3次，sleep依次收到1和2；ValueError立即抛出。

```python
def retry(fn, retryable, sleep, max_attempts=3, base=1.0, cap=8.0):
    raise NotImplementedError("请实现")

```

### AH-C03 单进程幂等执行器

标准库、顺序调用。store字典记录key对应payload和成功结果；相同key同payload返回缓存，不重复执行；同key不同payload抛ValueError。fn(payload)失败则不缓存。本题不承诺跨进程或外部副作用恰好一次。

验收示例：相同key和payload调用两次，fn计数为1；第一次失败后第二次可重试。

```python
def execute_once(store, key, payload, fn):
    raise NotImplementedError("请实现")

```

### AH-C04 工具请求参数校验

标准库；request严格包含name,args；registry[name]为{参数名:Python类型}。拒绝未知工具、多余/缺失参数及类型不匹配；int类型不接受bool。成功返回(name,args副本)，失败抛ValueError，不执行工具。

验收示例：registry={"add":{"a":int}}；a=True拒绝，a=1通过，未知工具拒绝。

```python
def validate_tool_call(request, registry):
    raise NotImplementedError("请实现")

```

### AH-C05 Agent 评测汇总

标准库；记录列表每项含success布尔、cost非负数、latency非负数。返回success_rate、total_cost、p95_latency；p95按最近秩ceil(0.95*N)计算。空列表三个值均0，非法记录抛ValueError。

验收示例：20条延迟1..20 → p95=19；全部失败时success_rate=0。

```python
def summarize_runs(records):
    raise NotImplementedError("请实现")

```

### AH-C06 总预算计费器

标准库；state含remaining非负有限数，charge非负有限数。若charge超余额抛ValueError且不改state；否则扣减并返回余额。不接受bool作为数值。

验收示例：remaining=3,charge=2 → 1；再charge=2拒绝且余额仍1。

```python
def consume_budget(state, charge):
    raise NotImplementedError("请实现")

```

### AH-C07 重复动作检测

标准库；actions为可JSON序列化字典列表，window正整数；最后window个动作按排序键的规范JSON相同则True，长度不足False；不忽略参数差异。

验收示例：连续三次{"name":"read","args":{"p":"a"}} → True；最后p变b → False。

```python
def repeated_action(actions, window=3):
    raise NotImplementedError("请实现")

```

### AH-C08 消息上下文预算裁剪

标准库；messages每项含role/content/tokens，tokens为非负整数且不接受bool；最多一条system且若有必须首条。保留system和其余消息的最长连续后缀，总tokens<=budget；system超预算ValueError。不得跳过后缀中间消息。

验收示例：tokens=[system:2,user:4,assistant:3],budget=5 → system和最后assistant。

```python
def trim_context(messages, budget):
    raise NotImplementedError("请实现")

```

### AH-C09 原子保存检查点

标准库；state可JSON序列化，path父目录存在。先写同目录临时文件并flush/fsync，再os.replace；失败清理临时文件，序列化失败不能破坏旧文件。只处理本地文件，不承诺断电时目录持久性。

验收示例：旧文件为{"step":1}，传入不可序列化对象 → 抛异常且旧文件内容保持。

```python
def save_checkpoint(path, state):
    raise NotImplementedError("请实现")

```

### AH-C10 任务状态转换校验

标准库；状态为pending/running/succeeded/failed/cancelled。允许pending→running/cancelled、running→succeeded/failed/cancelled；终态禁止转换，相同状态也拒绝，非法值抛ValueError。返回新状态，不做IO。

验收示例：pending→running通过；succeeded→running抛ValueError。

```python
def transition(current, target):
    raise NotImplementedError("请实现")

```

### AH-C11 依赖DAG拓扑排序

标准库；字典task→依赖列表，所有依赖必须为键且不得重复；每步选字典序最小的可执行任务。环或未知依赖ValueError；返回任务名列表。

验收示例：{"b":["a"],"a":[],"c":[]} → ["a","b","c"]。

```python
def topological_order(dependencies):
    raise NotImplementedError("请实现")

```

### AH-C12 异步限并发工具执行

asyncio；jobs为零参数async callable列表，limit>=1；同时执行不超过limit。按输入顺序返回{"ok":True,"value":...}或{"ok":False,"error":异常类名}；普通异常不阻止其他job，外层取消应传播。

验收示例：3个模拟job中第二个ValueError → 结果顺序保持，中间ok=False，其余完成。

```python
async def run_limited(jobs, limit=3):
    raise NotImplementedError("请实现")

```

### AH-C13 参数规范化哈希

标准库；payload只含JSON类型且禁止NaN/Infinity，用sort_keys=True、separators=(",",":"),ensure_ascii=False生成UTF-8字节并取SHA256十六进制。不修改payload。

验收示例：{"a":1,"b":2}与{"b":2,"a":1}摘要一致；a=1与a="1"不同。

```python
def payload_digest(payload):
    raise NotImplementedError("请实现")

```

### AH-C14 固定窗口限流器

标准库；store字典保存key对应(window_start,count)，窗口索引floor(now/window_seconds)，now>=0，window_seconds>0，limit>=1。允许则加1返回True，否则不变返回False；调用时间非递减，单线程。

验收示例：limit=2,window=10，同key在now=0请求三次 → True,True,False；now=10再次True。

```python
def allow_request(store, key, now, limit, window_seconds):
    raise NotImplementedError("请实现")

```

### AH-C15 安全日志字段脱敏

标准库；递归处理dict/list，字典键大小写无关匹配password/token/secret/api_key时值替换为"[REDACTED]"；其余值原样深复制。不处理自由文本内秘密，明确此限制。

验收示例：{"Token":"abc","x":[{"password":"p"}]} → 两处值都被替换，输入不变。

```python
def redact_fields(data):
    raise NotImplementedError("请实现")

```

### AH-C16 按资源权限过滤检索结果

标准库；docs每项含id、tenant、allowed_users列表；仅返回tenant精确匹配且user在allowed_users中的文档，保持顺序。不支持通配符，缺字段视为无权限。

验收示例：同用户授权但tenant不同的文档必须排除；无allowed_users也排除。

```python
def filter_documents(docs, tenant, user):
    raise NotImplementedError("请实现")

```

### AH-C17 RRF融合排名

标准库；输入多个唯一文档ID排名列表；每个列表中名次从1起，分数求和1/(k+rank)，k>0；按分数降序，同分ID字典序，返回(id,score)列表。

验收示例：rankings=[["a","b"],["b","a"]] → 同分时a在b前。

```python
def reciprocal_rank_fusion(rankings, k=60):
    raise NotImplementedError("请实现")

```

### AH-C18 轨迹最终状态评测

标准库；events按序含type及可选data；type为write时data含approved布尔，type为finish时data含success布尔。仅最后事件finish且success=True且所有write明确approved=True时返回True，其余False。不执行真实动作。

验收示例：未经审批write后finish成功 → False；只有成功finish → True；finish后还有事件 → False。

```python
def grade_trace(events):
    raise NotImplementedError("请实现")

```

### AH-C19 审批摘要绑定验证

标准库；ticket含digest/expires_at/user；request摘要按规范JSON SHA256计算，使用sort_keys=True,separators=(",",":"),ensure_ascii=False，禁止非有限数。仅用户相同、now<expires_at、摘要匹配返回True；缺字段False。本题假定ticket可信，不实现签名。

验收示例：同一票据更改request目标或now等于expires_at → False。

```python
def approval_matches(ticket, request, user, now):
    raise NotImplementedError("请实现")

```

### AH-C20 录制工具结果回放器

标准库；recordings列表每项name,args,result，calls列表每项name,args；严格按位置一一匹配，数量或内容不一致抛ValueError，匹配则返回结果深复制；不调用真实工具。

验收示例：录制read(p=a)而请求read(p=b) → ValueError；完全一致返回录制结果。

```python
def replay_tools(recordings, calls):
    raise NotImplementedError("请实现")

```
